/*
 * @Author: xiongzhiqing@everjiankang.com
 * @Date: 2020-12-10 11:09:56
 * @Last Modified by: xiongzhiqing@everjiankang.com
 * @Last Modified time: 2020-12-10 12:25:11
 * 第二章  量词
 */


// 使用正则表达式时的一条根本规律： 使用合适的结构（包括字符组合量词），精确表达自己的意图，界定能匹配的文本。

/**
 * 2.1 一般形式
 *
 * 字符组：[0-9] 或者 \d 匹配单个数字字符。
 *
 * 量词          说明
 * {n}          之前的元素必须出现n次
 * {m,n}        之前的元素最少出现m次，最多出现n次
 * {m,}         之前的元素最少出现m次，出现次数无上限
 * {0,n}        之前的元数可以不出现，也可以出现，最多出现n次 ({,n})
 *
 * example：
 *  验证中国大陆地区的邮政编码
 *  由 6 位数字构成的字符串，如 201203、100858
 *
*/

const regPc = /^\d{6}$/

console.log('"201203"匹配\d{6}:', regPc.test(201203))
console.log('"100858"匹配\d{6}:', regPc.test(100858))

console.log('"201A20"匹配\d{6}:', regPc.test('201A20'))
console.log('"20120"匹配\d{6}:', regPc.test(20120))
console.log('"2012011"匹配\d{6}:', regPc.test(2012011))

// 标识不确定长度的量词
const reg1 = /^\d{4,6}$/
const reg2 = /^\d{4,}$/
const reg3 = /^\d{0,6}$/

console.log('"123"匹配\d{4,6}:', reg1.test(123))
console.log('"1234"匹配\d{4,6}:', reg1.test(1234))
console.log('"123456"匹配\d{4,6}:', reg1.test(123456))
console.log('"1234567"匹配\d{4,6}:', reg1.test(1234567))

console.log('"123"匹配\d{4,}:', reg2.test(123))
console.log('"1234"匹配\d{4,}:', reg2.test(1234))
console.log('"123456"匹配\d{4,}:', reg2.test(123456))

console.log('"12345"匹配\d{0,6}:', reg3.test(12345))
console.log('"123456"匹配\d{0,6}:', reg3.test(123456))
console.log('"1234567"匹配\d{0,6}:', reg3.test(1234567))


/**
 * 2.2 常用量词
 * {m,n}是通用形式的量词
 *
 * 3个常用量词： *、+、?
 * 常用量词      {m,n}等价形式      说明
 * *            {0,}             可能出现，也可能不出现，出现次数没有上限
 * +            {1,}             至少出现一次， 出现次数没有上限
 * ?            {0,1}            至多出现一次，也可能不出现
 *
 *
*/

// 量词 ? 的应用
const reg4 = /^travell?er$/

console.log('"traveler"匹配travell?er:', reg4.test('traveler'))
console.log('"traveller"匹配travell?er:', reg4.test('traveller'))

// 解析HTML代码。
// HTML是一种“标签语言”，它包含各种各样的tag（标签）。如 <head>、<img>、<table> 等，名字各异，形式却相同：
// 从<开始，到>结束，在<和>之间有若干字符，“若干”的意思是长度不确定，当不能为 0 (<>b并不是合法的tag)，也不能是>字符。
// 用一个正则表达式匹配所有的tag，需要用<匹配开头的<，用>匹配结尾的>，用[^>]+匹配中间的“若干字符”

// open tag 特点是以 < 开头， 然后是 “若干字符”(但不能以／开头)，最后是 > ，所以对应的正则表达式是： <[^/][^>]*>

// close tag 特点是以 < 开头， 之后是／字符，然后是“若干字符”(但不能以／开头)，最后是 > ，所以对应的正则表达式是： </[^/]+>

// self-closing tag 特点是以 < 开头 ，中间是“若干字符”，最后是 />， 所以对应的正则表达式是：<[^>/]+/>

// 量词 + 的应用
const regHTML = /^<[^<>]+>$/

console.log('"<bold>"匹配<[^>]+>:', regHTML.test('<bold>'))
console.log('"</table>"匹配<[^>]+>:', regHTML.test('</table>'))
console.log('"<<table>"匹配<[^>]+>:', regHTML.test('<<table>'))
console.log('"<>"匹配<[^>]+>:', regHTML.test('<>'))

// 使用正则表达式匹配双引号字符串。双引号字符串的两个引号之间可以没有任何字符，“”是一个完全合法的字符串。 正则表达式："[^"]*"
// 量词 * 的应用

const regStr = /^"[^"]*"$/
const str1 = '""'
const str2 = '"1"'
console.log('""匹配"[^"]*":', regStr.test(str1))
console.log('"1"匹配"[^"]*":', regStr.test(str2))