
library(dplyr)
library(ggplot2)
library(scales)
library(tidyverse)
library(data.table)
library(lubridate)

cali <- fread("cali.csv", encoding = "UTF-8")
cali <- tbl_df(cali)

web <- fread("Web Analytics Data (DataPlusScience).csv", encoding = "UTF-8")
web <- tbl_df(web)

str(cali)
str(web)


# 1번
web %>% mutate(month = month(Date, label = TRUE)) %>% group_by(month) %>% summarise(sum_page = sum(Pageviews)) %>% ggplot(aes(month, sum_page)) + geom_bar(stat = "identity") 

#2번

# web %>% mutate(day = day(Date)) %>% group_by(day) %>% summarise(sum_page = sum(Pageviews)) %>% ggplot(aes(day, sum_page)) + geom_bar(stat = "identity") 

p <- web %>% mutate(date = as.Date(Date)) %>% select(date, Pageviews) %>% 
  group_by(date) %>% summarise(sum_Pageview = sum(Pageviews)) %>% 
  ggplot(aes(date, sum_Pageview)) + geom_line(stat = "identity") + 
scale_x_date(date_breaks = "2 month")

p

#3번
str(cali)

cali %>% group_by(ocean_proximity) %>% summarise(mean = mean(median_house_value)) %>% select(mean, ocean_proximity) %>% ggplot(aes(reorder(ocean_proximity, mean), mean)) + geom_bar(stat = "identity") + coord_flip()
         
#4번

cali %>% group_by(ocean_proximity) %>% summarise(mean = mean(median_house_value)) %>% select(mean, ocean_proximity) %>% ggplot(aes(reorder(ocean_proximity, -mean), mean)) + geom_bar(stat = "identity") + coord_flip()

# 5번

str(cali)

cali %>% ggplot(aes(ocean_proximity, )) + geom_point()
  
# summarise(sd = sd(median_income)) %>% ggplot(aes(x = factor(ocean_proximity))) + geom_bar(width = 1, colours="black")
                                                 
# 6번



