# 数值的扩展

## 二进制和八进制表示法

-   二进制数值（Binary）
    使用前缀 0b 表示二进制数

-   八进制数值（Octal）
    使用前缀 0o 表示八进制数

-   Number（） 方法
    将 0b 和 0o 前缀的字符串数值转为十进制

## 数值分隔符

允许数值使用下划线（\_）作为分隔符，对于内部数值的存储和输出，并没有影响

-   注意：
    1. 不能放在数值的最前面或最后面
    2. 不能两个或两个以上的分隔符连在一起
    3. 小数点的前后不能有分隔符
    4. 科学计数法里面，表示指数的 e 或 E 前后不能有分隔符
    5. 不能紧跟着进制的前缀 0b、0o、0x
    6. Number()、parseInt()、parseFloat()不支持数值分隔符

## Number 方法

-   Number.isFinite()用来检查一个数值是否为有限的，即不是 Infinity

-   Number.isNaN()用来检查一个值是否为 NaN

    与传统的全局方法 isFinite()和 isNaN()的区别在于：

    1. 传统方法先调用 Number()将非数值的值转为数值，再进行判断
    2. 新方法只对数值有效：
       Number.isFinite()对于非数值一律返回 false
       Number.isNaN()只有对于 NaN 才返回 true，非 NaN 一律返回 false。

-   Number.parseInt() 用于解析字符串为整数（十进制）数值，从字符串的开始位置开始解析，直到遇到非数字字符为止

-   Number.parseFloat() 用于解析字符串为浮点数（十进制）数值，从字符串的开始位置开始解析，直到遇到非数字字符为止，也会解析小数点。

-   Number.isInteger()用来判断一个数值是否为整数

-   Number.isSafeIntseger()用来判断一个整数是否落在 Number.MAX_SAFE_INTEGER 和 Number.MIN_SAFE_INTEGER 范围之内

## Number.EPSILON

极小的常量 Number.EPSILON。根据规格，表示 1 与大于 1 的最小浮点数之间的差
JavaScript 能够表示的最小精度
误差如果小于这个值，可以认为没有意义，即不存在误差
目的，在于为浮点数计算，设置一个误差范围

## Math 对象的扩展

-   Math.trunc()方法用于去除一个数的小数部分，返回整数部分
    对于非数值，将其先转为数值
    对于空值和无法截取整数的值，返回 NaN

-   Math.sign()方法用来判断一个数是正数、负数、还是零
    返回值：
    参数为正数，返回+1
    参数为负数，返回-1
    参数为 0，返回 0
    参数为-0，返回-0
    其他值，返回 NaN

-   Math.cbrt()方法用于计算一个数的立方根

-   Math.clz32()方法将参数转为 32 位无符号整数的形式，返回 32 位值里面有多少个前导 0
    对于小数，只考虑整数部分
    对于空值或其他类型的值，先转为数值再计算

-   Math.imul()方法返回两个数以 32 位带符号整数形式相乘的结果
    返回一个 32 位的带符号整数

-   Math.fround()方法返回一个数的 32 位单精度浮点数形式
    如果参数的绝对值大于 224，返回的结果开始丢失精度
    主要作用：将 64 位双精度浮点数转为 32 位单精度浮点数
    如果小数的精度超过 24 个二进制位，返回值就会不同于原值，否则返回值不变
    对于 NaN 和 Infinity，此方法返回原值
    对于其它类型的非数值，Math.fround 方法会先将其转为数值，再返回单精度浮点数

-   Math.hypot 方法返回所有参数的平方和的平方根
    只要有一个参数无法转为数值，就会返回 NaN

## 对数方法

-   Math.expm1()
    返回 e^x - 1，即 Math.exp(x) - 1

-   Math.log1p()
    返回 1 + x 的自然对数，即 Math.log(1 + x)
    如果 x 小于-1，返回 NaN

-   Math.log10()
    返回以 10 为底的 x 的对数
    如果 x 小于 0，则返回 NaN

-   Math.log2()
    返回以 2 为底的 x 的对数
    如果 x 小于 0，则返回 NaN

## 新增双曲函数方法

Math.sinh(x) 返回 x 的双曲正弦

Math.cosh(x) 返回 x 的双曲余弦

Math.tanh(x) 返回 x 的双曲正切

Math.asinh(x) 返回 x 的反双曲正弦

Math.acosh(x) 返回 x 的反双曲余弦

Math.atanh(x) 返回 x 的反双曲正切

## BigInt（大整数数据类型）

BigInt 只用来表示整数，没有位数的限制，任何位数的整数都可以精确表示
与 Number 类型区别，BigInt 类型的数据必须添加后缀 n
BigInt 与普通整数是两种值，它们之间并不相等
typeof 运算符对于 BigInt 类型的数据返回 bigint
BigInt 可以使用负号（-），但是不能使用正号（+），因为会与 asm.js 冲突

### BigInt 函数

1. 必须有参数，而且参数必须可以正常转为数值
2. 如果字符串无法解析成 Number 类型，所以会报错
3. 参数如果是小数，也会报错

-   实例方法
    BigInt.prototype.toString()
    BigInt.prototype.valueOf()
    BigInt.prototype.toLocaleString()

-   静态方法
    BigInt.asUintN(width, BigInt)： 给定的 BigInt 转为 0 到 2^width - 1 之间对应的值
    BigInt.asIntN(width, BigInt)：给定的 BigInt 转为 -2^width - 1 到 2^(width - 1) - 1 之间对应的值
    BigInt.parseInt(string[, radix])：近似于 Number.parseInt()，将一个字符串转换成指定进制的 BigInt

-   转换规则
    Boolean()、Number()和 String()将 BigInt 转为布尔值、数值和字符串类型
    取反运算符（!）将 BigInt 转为布尔值

-   运算符>>>和+不能使用
    不带符号的右移位运算符>>>（>>>运算符是不带符号的）
    一元的求正运算符+（总是返回 Number 类型）
    -   不能与普通数值进行混合运算
