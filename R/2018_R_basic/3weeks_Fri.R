# 라이브러리 ####
library(dplyr)
library(ggplot2)
library(scales)
library(tidyverse)
library(data.table)
library(lubridate)

#히스토그램과 바차트의 차이 ####

#히스토그램: 히스토그램은 연속형 자료에 대한 도수분포표를 시각화한 그래프다. 연속형 자료를 계급으로 나누어 계급별 도수를 막대로 나타낸다.
#바차트: 도수분포표를 막대모양으로 시각화한 것이다.즉, 자료의 범주별 빈도를 요약해서 나타낸 그래프라고 할 수 있다.

#히스토그램

ggplot(NEW_wage,aes(x = NEW_wage$Hrly_Rate))+geom_histogram()

#바차트 

ggplot(NEW_wage, aes(Below_or_Above))+geom_bar()

str(NEW_wage)


# 준비 ####
# 데이터 읽기

wage <- fread("Wage.csv", encoding = "UTF-8")
wage <- tbl_df(wage)

str(wage)

# 변수명 바꾸기
# 띄어쓰기를 _ 로 사용
x<-names(wage)
names(wage) <- as.vector(
  sapply(x, function(x) if(is.character(x)) gsub(" ", "\\_", x) else(x)))

x


# 변수형태 
# date, nummeric  
# "$", "," 사인제거
x1 <- wage[4]
x1
x1 <- as.vector(sapply(x1, function(x1) if(is.character(x1)) gsub(",", "", x1) else(x1)))
x1
wage[4] <- as.vector(sapply(x1, function(x1) if(is.character(x1)) gsub("\\$", "", x1) else(x1)))
x1
# number, date parsing
wage[4:10] <- as_tibble(lapply(wage[4:10], parse_number))
wage[13] <- as_tibble(lapply(wage[13], parse_date))

minimum_wage <- 17     # 최저임금 조정
required_service <- 4   # 최소근속연수 조정

wage %>% print(width = Inf)

NEW_wage <- wage %>% mutate(new = ifelse((Hrly_Rate < minimum_wage) & (Service_Time_in_Years > required_service), "Below Minimum Wage", "Above Minimum Wage"))

str(NEW_wage)

# 1 ####

wage

wage %>% ggplot(aes(Service_Time_in_Years, Hrly_Rate, color = NEW_wage$new)) + geom_point() + geom_vline(xintercept = 4, linetype = "longdash", color="grey50", size=0.7) +   # 세로선  geom_vline
  geom_hline(yintercept = 17, linetype = "longdash", color="grey50", size=0.7) +  # 가로선  geom_hline
  annotate("text", x = 3, y = 0, label = "Required Service : 4 year", hjust = -0.1, vjust = -0.1) +  # 텍스트 주석  annotate("text", label=)
  annotate("text", x = 10, y = 17, label = "Minimum Wage : $17", hjust = 0.2, vjust = -0.5) +  # 텍스트 주석  annotate("text", label=)
  lims(x = c(0,40), y = c(0, 35)) + scale_color_manual(values = c("grey60", "blue"))  

# 2 ####

b <- NEW_wage %>% filter(new == "Below Minimum Wage") %>%   # 최저임금 이하의 직원
  group_by(Budget_Area) %>%    # 부서별 집계
  summarise(sum_Wage_Correction = sum(Wage_Correction), # 최저임금의 금전적 영향
            sum_Record = sum(레코드_수)) %>%          # 최저임금 미만의 직원
  arrange(desc(sum_Wage_Correction))   # 내림차순으로 정렬

b

endatalong <- gather(b, key = "measure", value = "value", c("sum_Wage_Correction", "sum_Record"))

endatalong %>% print(n = Inf)

endatalong %>% 
  transform( measure = factor(measure, levels = c("sum_Wage_Correction", "sum_Record"))) %>%  # facet 상 순서를 바꾸기 위해 levels 범주 순서 바꿈
  # ggplot 생성
  ggplot(aes(reorder(Budget_Area, value), value)) +  # 부서별 value 를 내림차순으로 정렬
  # geom
  geom_bar(stat= "identity") +                       # bar 
  geom_text(aes(label = value), vjust = 0, hjust = 0, color = "grey50") + # value 값을 label로 생성
  facet_wrap(~measure, scale = "free_x") +  # 데이터를 여러 개의 부분집합으로 나누고( measure 범주별 ) 작은 여러 개의 그래프 생성
  # coord
  coord_flip()   # coord_flip()은 x축과 y축의 구성을 뒤집어 표현하라는 명령어

# 3 ####

str(NEW_wage)

NEW_wage %>% 
  ggplot(aes(x = Hrly_Rate_Bin_Size)) + 
  geom_histogram(aes(fill = new), binwidth = 1) + 
  scale_fill_manual(values = c("grey60", "blue"))

ggplot(data = NEW_wage, aes(Hrly_Rate_Bin_Size)) + 
  stat_function(fun = dnorm, 
                args = list(mean = mean(NEW_wage$Hrly_Rate), sd= sd(NEW_wage$Hrly_Rate)), 
                color = "darkblue", size = 2)

n = nrow(NEW_wage)  # 917
mean = mean(NEW_wage$Hrly_Rate)  # 16.70716
sd = sd(NEW_wage$Hrly_Rate)  #3.642373
binwidth = 1  # 막대사이즈 
# passed to geom_histogram and stat_function

# NEW_wage 데이터에 정규분포 데이터 추가
set.seed(1)
NEW_wage <- NEW_wage %>% mutate(x = rnorm(n, mean, sd))
names(NEW_wage)

NEW_wage %>% 
  ggplot(aes(x = Hrly_Rate_Bin_Size)) + 
  geom_histogram(aes(fill = new), binwidth = binwidth) + 
  stat_function(fun = function(x) dnorm(x, mean = mean, sd = sd) * n * binwidth, 
                color = "darkblue", size = 1) +
  scale_fill_manual(values = c("grey60", "blue"))

# 4 ####

NEW_wage %>% ggplot(aes(Hrly_Rate_Correction_Bin_Size)) + geom_histogram(aes(fill = new), binwidth = 1) + scale_fill_manual(values = c("grey60", "blue"))

ggplot(NEW_wage, aes(x = Hrly_Rate_Correction_Bin_Size)) + geom_histogram(aes(fill = new), binwidth = binwidth) + stat_function(fun = function(x) dnorm(x, mean = mean, sd = sd) * n * binwidth, color = "darkblue", size = 1) +  scale_fill_manual(values = c("grey60", "blue"))
