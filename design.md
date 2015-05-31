
## 修改（只支持post）：
http://www.zhihu.com/answer/content

参数：

* id: 知乎的每一答案，皆有resourceid，作为修改、读取、和删除答案的标识。这个id存储于答案div的data-resourceid属性。
* content:<内容>
* field_name:应该是写死为content
* _xsrf:不知道干啥用，应该是用户登录凭据，从页面隐藏的name为_xsrf的输入框中取得



## 删除：
http://www.zhihu.com/answer/remove

## 读取内容：
http://www.zhihu.com/draft/get?qid=<resourceid>

返回结果：

* r 不知道干啥用，常年为0
* msg 答案内容

如：

http://www.zhihu.com/draft/get?qid=4296931

