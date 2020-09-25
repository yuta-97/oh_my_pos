# API 정리
모든 API는 이곳에 정리합니다.

<br>

|URL|type|req|res|value|예시|
|:-:|:-:|:-:|:-:|:-:|:-|
|/api/regitst|post|id, pw, email|json{ result }|OK, FAIL| {<br>&nbsp;"id":"test",<br>&nbsp;"pw":"pw",<br>&nbsp;"email":"test@test.com"<br>}|
|/api/login|post|id, pw|json{ result }|OK, FAIL|{<br>&nbsp;"id":"test",<br>&nbsp;"pw":"pw"<br>}|
|/api/getuser|post|id|json{ result, user }|OK/FAIL, user_data|{<br>&nbsp;"id":"test"<br>}|
|/api/setgoods|post|menu, price, desc|json{ result }|OK, FAIL|{<br>&nbsp;"goodsname":"sample",<br>&nbsp;"type":"coffee",<br>&nbsp;"price":"1000",<br>&nbsp;"desc":"this is best coffee!"<br>}
|/api/getgoods|post|menu|json{ result, goods }|OK/FAIL|{<br>&nbsp;"goodsname":"sample"<br>&nbsp;}|
|/api/setstore|post|storename, tablenum, [disname, disrate]|json{ result }|OK/FAIL|{<br>&nbsp;"storename":"test",<br>&nbsp;"tablenum":"30",<br>&nbsp;"discount":[{<br>&nbsp; "disname":"일반할인",<br>&nbsp;"disrate":"3.3"<br>&nbsp;},{<br>&nbsp;"disname":"vip할인",<br>&nbsp;"disrate":"2.0"<br>&nbsp;}]<br>}
|/api/getstore|post|storename|json{ result, store }|OK/FAIL, store_data|{<br>&nbsp;"storename":"test"<br>}
|/api/setcategory|post|categoryname, [optionname, optionprice]|json{ result, category }|OK/FAIL, category_data|{<br>&nbsp;"categoryname":"coffee",<br>&nbsp;"options":[{<br>&nbsp; "optionname":"샷추가",<br>&nbsp;"optionprice":"1000",<br>&nbsp;},{<br>&nbsp;"optionname":"연하게",<br>&nbsp;"optionprice":"0"<br>&nbsp;}]<br>}
|/api/getcategory|post|categoryname|json{ result, category }|OK/FAIL|{<br>&nbsp;"categoryname":"coffee"<br>}
