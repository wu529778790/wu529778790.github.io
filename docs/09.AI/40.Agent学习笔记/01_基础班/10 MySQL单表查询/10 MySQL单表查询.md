---
title: MySQL单表查询
date: 2026-08-12 10:50:10
categories:
  - Agent学习笔记
tags:
  - MySQL
  - 单表查询
---

# MySQL单表查询
> 本篇知识点：① 表中约束　② delete/truncate 区别　③ 单表查询（基础/条件/排序/聚合/分组/limit/SQL 顺序）

---

## 今日大纲

1. 表中约束【了解】
2. delete 和 truncate 区别
3. 单表查询【重点】：基础查询、条件查询、排序查询、聚合函数、分组查询、limit 查询、SQL 顺序

---

# 一、表中约束【了解】

> ==约束作用：限制数据的插入和删除==

## 约束总结

```properties
主键约束: primary key      特点: 修饰列对应的值非空唯一
主键自增: AUTO_INCREMENT   特点: 修饰主键对应的值不指定主键字段或者用0和null占位代表自动使用自增
非空约束: not null         特点: 修饰列对应的值不能为空
唯一约束: unique           特点: 修饰列对应的值不能重复
默认约束: default          特点: 修饰列对应的值提前设置默认值
```

```sql
/*
常见约束:
主键约束: 限制对应的列数据不能为空,不能重复
非空约束: 限制对应的列数据不能为空
唯一约束: 限制对应的列数据不能重复
默认约束: 可以提前给对应列添加默认值
外键约束: 限制多表中主从表的数据,保证数据统一完整性
# 注意1: 约束可以建表时添加(建议),也可以建表后添加(不建议)
# 注意2: 一个表中主键约束只能有且仅有1个,其他约束可以有多个
*/
create table student_ys
(
    id     int primary key,
    name   varchar(100) not null unique,
    height float        not null,
    weight double,
    money  decimal(10, 2) default 0
);
desc student_ys;

# 验证约束作用
insert into student_ys (id,name,height) values (null,'张三',188.88); # 失败,非空
insert into student_ys (id,name,height) values (0,'李四',188.88);    # 成功
insert into student_ys (id,name,height) values (1,'张三',188.88);    # 成功
insert into student_ys (id,name,height) values (1,'张三',188.88);    # 失败,唯一
insert into student_ys (id,name,height) values (2,null,188.88);      # 失败,非空
insert into student_ys (id,name,height,money) values (2,'王五',188.88,10000000); # 成功,指定值不使用默认值
```

**主键自增**：

```sql
create table student_ys_auto_i
(
    id     int primary key auto_increment,
    name   varchar(100),
    height float,
    money  decimal(10, 2)
);
# 注意: 如果主键添加了自增,那么此时null和0都代表默认使用自增,从1开始每次加1
insert into student_ys_auto_i (id,name) values (null,'张三');  # 成功,默认自增
# 建议: 如果添加了自增,插入数据的时候主键就不用指定,默认使用自增
insert into student_ys_auto_i (name) values ('张三');
```

## delete 和 truncate 区别

```properties
delete和truncate的区别?
    共同点: 都能删除表中所有数据
    不同点:
        delete删除所有数据: 自增顺序保留,下次再插入的时候继续自增
        truncate删除所有数据: 自增顺序重置,下次再插入数据的时候从1重新开始自增
```

```mysql
# delete删除所有数据,但不会重置自增顺序
delete from student_ys_auto_i;
# truncate删除所有数据,同时也重置了自增顺序
truncate student_ys_auto_i;
```

---

# 二、单表查询【重点】

## 1. 准备数据

```mysql
CREATE DATABASE IF NOT EXISTS day02_db CHARSET=utf8;
USE day02_db;

# 建测试表: 商品表 + 分类表
drop table if EXISTS products;
CREATE TABLE IF NOT EXISTS products
(
    id          INT PRIMARY KEY AUTO_INCREMENT, -- 商品ID
    name        VARCHAR(24)    NOT NULL,        -- 商品名称
    price       DECIMAL(10, 2) NOT NULL,        -- 商品价格
    score       DECIMAL(5, 2),                  -- 商品评分,可以为空
    is_self     VARCHAR(8),                     -- 是否自营
    category_id INT                             -- 商品类别ID
);

drop table if EXISTS category;
CREATE TABLE IF NOT EXISTS category
(
    id   INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(24) NOT NULL
);

INSERT INTO category VALUES (1,'手机'),(2,'电脑'),(3,'美妆'),(4,'家居');

INSERT INTO products VALUES
(1, '华为Mate50', 5499.00, 9.70, '自营', 1),
(2, '荣耀80', 2399.00, 9.50, '自营', 1),
(3, '荣耀80', 2199.00, 9.30, '非自营', 1),
(4, '红米note 11', 999.00, 9.00, '非自营', 1),
(5, '联想小新14', 4199.00, 9.20, '自营', 2),
(6, '惠普战66', 4499.90, 9.30, '自营', 2),
(7, '苹果Air13', 6198.00, 9.10, '非自营', 2),
(8, '华为MateBook14', 5599.00, 9.30, '非自营', 2),
(9, '兰蔻小黑瓶', 1100.00, 9.60, '自营', 3),
(10, '雅诗兰黛粉底液', 920.00, 9.40, '自营', 3),
(11, '阿玛尼红管405', 350.00, NULL, '非自营', 3),
(12, '迪奥996', 330.00, 9.70, '非自营', 3);
```

## 2. 基础查询

```properties
基础查询关键字: select:查什么    from: 从哪儿查
基础查询格式:  select [distinct] 字段名 | * from 表名;
    []: 可以省略
    |: 或者
    *: 对应表的所有字段名
    distinct: 去除重复内容
    as: 可以给表或者字段起别名
```

```mysql
-- 需求1: 查看所有商品
select * from products;
-- 需求2: 查看所有商品的名称和价格
select name,price from products;
-- 需求3: 给字段名起别名展示
select name as 姓名,price as 价格 from products;
-- 需求4: 给表名起别名并使用(如果给表起了别名,必须用别名调用字段)
select p.name,p.price from products as p;
-- 需求5: 查看所有的分类编号,去重展示
select DISTINCT category_id from products;
```

## 3. 条件查询

```properties
条件查询关键字: where
条件查询基础格式: select 字段名 from 表名 where 条件;
    比较运算符: >  <  >=  <=  !=  <>
    逻辑运算符: and  or  not
    范围查询: 连续范围:between x and y   非连续范围: in(x,y)
    模糊查询: 关键字:like   %:0个或者多个字符   _:一个字符
    非空判断: 为空: is null   不为空: is not null
```

### 比较查询

```mysql
-- 需求1: 查询所有'自营'的商品
select * from products where is_self = '自营';
-- 需求2: 查询评分在'9.50'(不含)以上的商品
select * from products where score > 9.50;
-- 需求3: 查询价格在999(不含)以下的商品
select * from products where price < 999;
-- 需求4: 查询评分不等于9.30的商品
select * from products where score != 9.3;
select * from products where score <> 9.3;
```

### 逻辑查询

```mysql
-- and: 并且  or: 或者  not: 取反
-- 需求1: 自营商品中价格大于2000的商品
select * from products where is_self = '自营' and price > 2000;
-- 需求2: 商品评分在9.0(含)-9.5(含)之间的商品
select * from products where score >= 9 and score <= 9.5;
-- 需求3: 价格是999或者2199或者2399的商品
select * from products where price = 999 or price = 2199 or price = 2399;
-- 需求4: 商品不是自营的商品
select * from products where not is_self = '自营';
-- 需求5: 商品不在1000到3000之间的商品
select * from products where not (price >= 1000 and price <= 3000);
```

### 范围查询

```mysql
-- 需求1: 商品价格在1000(含)到3000(含)之间的商品
select * from products where price BETWEEN 1000 and 3000;
-- 注意: 以下语法是错误的
-- select * from products where 1000 <= price <= 3000;
-- 需求2: 商品不在1000到3000之间的商品
select * from products where price not BETWEEN 1000 and 3000;
-- 需求3: 价格是999或者2199或者2399的商品
select * from products where price in(999,2199,2399);
-- 需求4: 商品是'华为Mate50'或者'荣耀80'的商品
select * from products where name in('华为Mate50','荣耀80');
```

### 模糊查询

```mysql
-- 关键字: like   %:任意多个字符   _:任意1个字符
-- 需求1: 商品名称以'华'开头
select * from products where name like '华%';
-- 需求2: 商品名称以'华'开头并且8个字符
select * from products where name like '华_______';
-- 需求3: 商品名称以'66'结尾
select * from products where name like '%66';
-- 需求4: 商品名称中包含'兰'字
select * from products where name like '%兰%';
-- 需求5: 商品名称中第3个字是'兰'字
select * from products where name like '__兰%';
```

### 非空判断

```mysql
/*
null在sql中代表空的,没有任何意义
如果数据中有空字符串'',字符串'null',一定要注意,他们和sql中的null不是一回事!!!
*/
-- 需求1: 查询未评分的商品信息
select * from products where score is null;
-- 注意: 以下方式是错误的
-- select * from products where score = null;
-- select * from products where score = 'null';

-- 需求2: 查询商品名称是'null'的商品信息
select * from products where name = 'null';
-- 需求3: 查询商品名称是''的商品信息
select * from products where name = '';
```

## 4. 排序查询

```properties
排序查询关键字: order by
基础格式: select 字段名 from 表名 order by 排序字段名 asc|desc;
    asc: 升序(默认)
    desc: 降序
进阶格式: select 字段名 from 表名 order by 排序字段1名 asc|desc , 排序字段2名 asc|desc;
    注意: 如果order by后跟多个排序字段,先按照前面的字段排序,如果有相同值的情况再按照后面的排序规则排序
```

```mysql
-- 示例1: 查询所有商品,按评分从高到低排序
SELECT * FROM products ORDER BY score DESC;
-- 示例2: 先按评分降序,评分相同的再按价格从低到高
SELECT * FROM products ORDER BY score DESC, price;
```

## 5. 聚合函数

```properties
聚合函数: 又叫统计函数,也叫分组函数
常用聚合函数: sum()  count()  avg()  max()  min()
聚合查询基础格式: select 聚合函数(字段名) from 表名;   # 没有分组默认整个表就是一个大的分组
注意: 聚合函数(字段名)会自动忽略null值,以后统计个数一般用count(*)统计因为它不会忽略null值
```

```mysql
-- 示例1: 统计当前商品一共有多少件
SELECT count(id) FROM products;
SELECT count(*) FROM products;
-- 示例2: 对商品评分列进行计数、求最大、求最小、求和、求平均
SELECT COUNT(score) AS cnt, MAX(score) AS max_score,
       MIN(score) AS min_score, SUM(score) AS total_score,
       AVG(score) AS avg_score
FROM products;
-- 示例3: 统计所有非自营商品评分的平均值
SELECT is_self, AVG(score) FROM products WHERE is_self = '非自营';
-- 练习: 统计有评分的商品个数
select count(*) from products where score is not null;
```

## 6. 分组查询

```properties
分组查询关键字: group by
基础格式: select 分组字段名,聚合函数(字段名) from 表名 group by 分组字段名;
注意: select后的字段名要么在group by后面出现过,要么写到聚合函数中,否则报错

进阶格式: select 分组字段名,聚合函数(字段名) from 表名 [where 非聚合条件] group by 分组字段名 [having 聚合条件];

where和having的区别?
    书写顺序: where在group by前,having在group by后
    执行顺序: 同上
    分组函数: where后不能跟聚合条件,只能跟非聚合条件;having后可以使用聚合条件,也可以使用非聚合条件(不建议)
    应用场景: 建议大多数过滤数据都采用where,只有当遇到聚合条件的时候再使用having
    使用别名: where后不能使用别名,having后可以使用别名
```

```mysql
-- 示例1: 统计每个分类的商品数量
SELECT category_id, COUNT(id) AS cnt
FROM products
GROUP BY category_id;

-- 示例2: 统计每个分类中自营和非自营商品的数量
SELECT category_id, is_self, COUNT(id) AS cnt
FROM products
GROUP BY category_id, is_self;

-- 示例3: 统计每个分类商品的平均价格,并筛选出平均价格低于1000的分类
SELECT category_id, AVG(price)
FROM products
GROUP BY category_id
HAVING AVG(price) < 1000;

-- 示例4: 统计自营商品中,每个分类的平均价格,筛选平均价格高于2000的分类
SELECT category_id, AVG(price) AS avg_price
FROM products
WHERE is_self = '自营'        -- where在分组之前过滤
GROUP BY category_id
HAVING AVG(price) > 2000;    -- having在分组聚合之后过滤
```

## 7. limit 查询（分页）

```properties
分页查询关键字: limit
分页查询基础格式: select 字段名 from 表名 limit x,y;
    x: 起始索引,默认从0开始   x = (页数-1)*y
    y: 本次查询的条数
注意: limit能完成topN需求,但是不能考虑到并列情况,此问题可以使用后期学习的开窗函数解决
```

```mysql
-- 示例1: 获取所有商品中,价格最高的商品信息
SELECT * FROM products ORDER BY price DESC LIMIT 1;
-- 示例2: 将商品按价格从低到高排序,获取第2页内容(每页3条)
SELECT * FROM products ORDER BY price LIMIT 3, 3;
-- 示例3: 当分页展示的数据不存在时,不报错,只不过查询不到任何数据
SELECT * FROM products LIMIT 20, 10;
```

## 8. SQL 顺序

```properties
书写顺序: SELECT -> DISTINCT -> 聚合函数 -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY -> LIMIT
执行顺序: FROM -> WHERE -> GROUP BY -> 聚合函数 -> HAVING -> SELECT -> DISTINCT -> ORDER BY -> LIMIT
```

