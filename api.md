# API 정리
모든 API는 이곳에 정리합니다.

<br>

|URL                 |type      |req                                                   |res                             |value                           |Exception         |
|:------------------:|:--------:|:-----------------------------------=----------------:|:------------------------------:|:------------------------------:|:-----------------|
|/api/regitst        |post      |user_id, user_pw, user_email                          |Bool(true, false)               |true, false                     ||
|/api/login          |post      |user_id, user_pw                                      |Bool(true, false)               |true, false                     ||
|/api/logedin        |get       |session.login                                         |Bool(true, false)               |true, false                     ||
|/api/logout         |get       |session                                               |None, error                     |None, error                     ||
|/api/setstore       |post      |storename, session                                    |None, error                     |None, error                     ||
|/api/setstoreSession|post      |storename,tablenum,{ discount: { disname, disrate } } |Bool(true, false)               |true, false                     ||
|/api/getstorenames  |get       |session.user_id                                       |json{ store_name }              |store_name data                 ||
|/api/getstore       |get       |session.store_name                                    |json{ store }                   |store data                      ||
|/api/store          |delete    |category_name                                         |None, error                     |None, error                     ||
|/api/setcategory    |post      |category_name, option_name, option_price, session     |Bool(true, false)               |true, false                     ||
|/api/getcategoryname|get       |session                                               |json{ category_name }           |category_name                   ||
|/api/getcategory    |get       |session                       |json{ category_name, option_name, option_price }|category_name, option_name, option_price||
|/api/category       |delete    |category_name                                         |None, error                     |None, error                     ||
|/api/setgoods       |post      |goods_name, price, desc, type, session                |Bool(true, false)               |true, false                     ||
|/api/getgoodsnames  |get       |session.store_name                                    |json{ goods_name }              |goods_name                      ||
|/api/getgoods       |get       |session.store_name            |json{ img_url, goods_name, price, desc, category_name }|img_url, goods_name, price, desc, category_name||
|/api/goods          |delete    |goods_name                                            |None, error                     |None, error                     ||
|/api/saveimage      |post      |formData                                              |None                            |None                            ||
|/api/getimage/:imgname|get     |params.imgname                                        |Data                            |Data                            ||


