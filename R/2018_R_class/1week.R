library("ggplot2")

head(mtcars)

mtcars2 <- mtcars
mtcars2$trans <- factor(mtcars$am, 
                        levels=0:1, 
                        labels=c("automatic", "manual"))

# mtcars의 am을 벡터자료로 설정하여 요인 벡터에 "automatic", "manual"로 각각 요인이름을 붙인다


mtcars2$gear <- as.factor(mtcars$gear) # gear를 벡터의 형태로 변환한다.
mtcars2$am <- NULL
mtcars2$vs <- NULL
mtcars2$drat <- NULL
mtcars2$carb <- NULL
mtcars2$wt <- NULL
mtcars2$hp <- NULL
mtcars2$qsec <- NULL

head(mtcars2)

# Examples of geoms and aesthetics

p <- ggplot(mtcars2) # 이 데이터를 사용하겠다는 말을 해주는 것
p

# x축은 disp, y축은 mpg데이터를 사용하여 gear에 따라 모양을 달리하여 점을 찍는다.
p + geom_point(aes(x=disp, y=mpg, shape=gear),
               size=4) 

# geom_text의 경우 label이 무조건 따라와야 한다. 
p + geom_text(aes(x=disp, y=mpg, label=gear))

lmcoef <- coef(lm(mpg ~ disp, mtcars2))
lm(mpg ~ disp, mtcars2)        # 회귀식, y = 연비, x = 배기량

lmcoef[1]

# 산점도 + 회귀 직선

p + geom_point(aes(x=disp, y=mpg)) +
  geom_abline(intercept=lmcoef[1], slope=lmcoef[2])  

# 절편, 기울기

# 산점도로 그래프를 그리며  x축은 disp, y축은 mpg 데이터를 사용한다.
# scale_continuous 함수로 축의 간격을 조절할 수 있다. 해당 코드에서는 축의 이름을 설정하였다.
p + geom_point(aes(x=disp, y=mpg)) + 
  scale_y_continuous(name="miles per gallon") +
  scale_x_continuous(name="displacement (cu.in.)")

# 두개다 연속형이어야한다.
update_geom_defaults("smooth", aes(color="red"))    # Modify geom/stataesthetic defaults for future plots
p + geom_smooth(aes(x=disp, y=mpg))


#해당 코드에서는 y축의 범위를 40까지 설정하였다.
p + geom_point(aes(x=disp, y=mpg)) +
  scale_y_continuous(limits=c(0, 40)) 
