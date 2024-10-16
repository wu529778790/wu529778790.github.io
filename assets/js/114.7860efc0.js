(window.webpackJsonp=window.webpackJsonp||[]).push([[114],{452:function(v,t,_){"use strict";_.r(t);var a=_(4),s=Object(a.a)({},(function(){var v=this,t=v._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[t("p",[t("img",{attrs:{src:"https://gcore.jsdelivr.net/gh/wu529778790/image/blog/20210723142749.png",alt:"20210723142749"}})]),v._v(" "),t("p",[v._v("HTTPS 是在 HTTP 和 TCP 之间建立了一个安全层，HTTP 与 TCP 通信的时候，必须先进过一个安全层，对数据包进行加密，然后将加密后的数据包传送给 TCP，相应的 TCP 必须将数据包解密，才能传给上面的 HTTP")]),v._v(" "),t("p",[t("img",{attrs:{src:"https://gcore.jsdelivr.net/gh/wu529778790/image/blog/20210723144352.png",alt:"20210723144352"}})]),v._v(" "),t("h2",{attrs:{id:"基本概念"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#基本概念"}},[v._v("#")]),v._v(" 基本概念")]),v._v(" "),t("p",[v._v("谈到 HTTPS, 就不得不谈到与之相对的 HTTP。HTTP 的特性是明文传输，因此在传输的每一个环节，数据都有可能被第三方窃取或者篡改，具体来说，HTTP 数据经过 TCP 层，然后经过 WIFI 路由器、运营商和目标服务器，这些环节中都可能被中间人拿到数据并进行篡改，也就是我们常说的中间人攻击。")]),v._v(" "),t("p",[v._v("为了防范这样一类攻击，我们不得已要引入新的加密方案，即 HTTPS。")]),v._v(" "),t("p",[v._v("HTTPS 并不是一个新的协议, 而是一个加强版的 HTTP。其原理是在 HTTP 和 TCP 之间建立了一个中间层，当 HTTP 和 TCP 通信时并不是像以前那样直接通信，直接经过了一个中间层进行加密，将加密后的数据包传给 TCP, 响应的，TCP 必须将数据包解密，才能传给上面的 HTTP。这个中间层也叫安全层。安全层的核心就是对数据加解密")]),v._v(" "),t("h3",{attrs:{id:"tls-ssl-主要依赖与三种基本算法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#tls-ssl-主要依赖与三种基本算法"}},[v._v("#")]),v._v(" TLS/SSL 主要依赖与三种基本算法")]),v._v(" "),t("ul",[t("li",[v._v("散列算法")]),v._v(" "),t("li",[v._v("对称加密")]),v._v(" "),t("li",[v._v("非对称加密")])]),v._v(" "),t("p",[v._v("利用非对称加密实现身份认证和密匙协商，对称加密算法采用协商的密匙对数据加密，基于散列函数验证信息的完整性")]),v._v(" "),t("p",[v._v("非对称加密是实现身份认证和密匙协商")]),v._v(" "),t("p",[v._v("对称加密是对信息进行加密")]),v._v(" "),t("p",[t("img",{attrs:{src:"https://gcore.jsdelivr.net/gh/wu529778790/image/blog/20210723150603.png",alt:"20210723150603"}})]),v._v(" "),t("h3",{attrs:{id:"ssl-和-tls"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#ssl-和-tls"}},[v._v("#")]),v._v(" SSL 和 TLS")]),v._v(" "),t("p",[v._v("SSL 是 TLS 的前身,漏洞原因已经弃用 ssl，现在 TLS 主流版本是 1.2")]),v._v(" "),t("h3",{attrs:{id:"ssl-tls-协议和证书的关系"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#ssl-tls-协议和证书的关系"}},[v._v("#")]),v._v(" SSL/TLS 协议和证书的关系")]),v._v(" "),t("p",[v._v("证书不依赖协议，和协议没有太大关联，我们也不需要去纠结是使用 SSL 证书和 TLS 证书，协议由服务器配置决定，证书是配合协议一块使用的")]),v._v(" "),t("h3",{attrs:{id:"私钥、公钥"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#私钥、公钥"}},[v._v("#")]),v._v(" 私钥、公钥")]),v._v(" "),t("blockquote",[t("p",[v._v("A,B 双方准备进行系统间的通信，基于安全的考虑，采用数据加密通信。这时候，A 有自己的公私钥，分别是 A 公和 A 私，B 也有自己的公私钥，分别是 B 公和 B 私。通信前，双方需要交换公钥，这时候，A 手上的密钥有:A 私和 B 公，B 手上的密钥有:B 私和 A 公\n通信时，A 使用 B 公进行敏感信息的加密，使用 A 私签名。B 收到信息后，使用 B 私进行敏感信息解密，使用 A 公进行验签。反之亦然。")])]),v._v(" "),t("ol",[t("li",[t("p",[v._v("公钥和私钥成对出现.公开的密钥叫公钥，只有自己知道的叫私钥")])]),v._v(" "),t("li",[t("p",[v._v("公钥用于敏感信息的加密,私钥用于签名.所以公钥的作用是保证数据安全,私钥的作用的标记信息的发送方.")])]),v._v(" "),t("li",[t("p",[v._v("用公钥加密的数据只有对应的私钥可以解密,用私钥签名只有对应的公钥可以验签.")])]),v._v(" "),t("li",[t("p",[v._v("用公私钥加解密的方式叫作非对称加密.")])]),v._v(" "),t("li",[t("p",[v._v("其实通信双方使用同一对公私钥也是可以的.")])])]),v._v(" "),t("h3",{attrs:{id:"对称加密"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#对称加密"}},[v._v("#")]),v._v(" 对称加密")]),v._v(" "),t("p",[v._v("加密和解密同用一个密钥")]),v._v(" "),t("p",[v._v("Q1：许许多多的客户端，不可能都用同一秘钥进行信息加密，该怎么办呢？")]),v._v(" "),t("p",[v._v("解决办法：一个客户端使用一个密钥进行加密")]),v._v(" "),t("p",[v._v("Q2：既然不同的客户端使用不同的密钥，那么对称加密的密钥如何传输？")]),v._v(" "),t("p",[v._v("解决办法：只能是「一端生成一个秘钥，然后通过 HTTP 传输给另一端」")]),v._v(" "),t("p",[v._v("Q3：这个传输密钥的过程，又如何保证加密？「如果被中间人拦截，密钥也会被获取,」 那么你会说对密钥再进行加密，那又怎么保存对密钥加密的过程，是加密的过程？")]),v._v(" "),t("p",[v._v("解决办法：非对称加密")]),v._v(" "),t("h3",{attrs:{id:"非对称加密"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#非对称加密"}},[v._v("#")]),v._v(" 非对称加密")]),v._v(" "),t("p",[v._v("RSA ECC DH 等")]),v._v(" "),t("p",[v._v("非对称加密，有以下特点：")]),v._v(" "),t("ul",[t("li",[v._v("有一对秘钥，【公钥】和【私钥】。")]),v._v(" "),t("li",[v._v("公钥加密的内容，只有私钥可以解开，私钥加密的内容，所有的公钥都可以解开，这里说的【公钥都可以解开，指的是一对秘钥】。")]),v._v(" "),t("li",[v._v("公钥可以发送给所有的客户端，私钥只保存在服务器端。")]),v._v(" "),t("li",[v._v("信息传输一对多，服务器只需要维持一个私钥就能够和多个客户端进行加密通信。")])]),v._v(" "),t("p",[v._v("非对称加密，有以下缺点：")]),v._v(" "),t("ul",[t("li",[v._v("公钥是公开的，所以针对私钥加密的信息，黑客截获后可以使用公钥进行解密，获取其中的内容；")]),v._v(" "),t("li",[v._v("公钥并不包含服务器的信息，使用非对称加密算法无法确保服务器身份的合法性，存在中间人攻击的风险，服务器发送给客户端的公钥可能在传送过程中被中间人截获并篡改；")]),v._v(" "),t("li",[v._v("使用非对称加密在数据加密解密过程需要消耗一定时间，降低了数据传输效率；")])]),v._v(" "),t("h3",{attrs:{id:"对称加密和非对称加密区别"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#对称加密和非对称加密区别"}},[v._v("#")]),v._v(" 对称加密和非对称加密区别")]),v._v(" "),t("ul",[t("li",[v._v("对称加密需要发送生成的秘钥给对方，非对称加密不需要发送用来解密的私有秘钥")]),v._v(" "),t("li",[v._v("安全性：对称加密发动秘钥容易落入攻击者之手，这样就失去了加密的意义。非对称加密的公开密钥可以随意发布，任何人都可以获得")]),v._v(" "),t("li",[v._v("对称加密的好处是解密的效率比较快；非对称加密的好处是可以使得传输的内容不被破解")])]),v._v(" "),t("h3",{attrs:{id:"https-采用对称加密-非对称加密"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#https-采用对称加密-非对称加密"}},[v._v("#")]),v._v(" HTTPS 采用对称加密+非对称加密")]),v._v(" "),t("p",[v._v("https 将对称加密和非对称加密结合起来，充分利用两者各自的优势。在交换秘钥环节使用非对称加密，之后建立通信交换报文阶段使用非对称加密")]),v._v(" "),t("p",[v._v("具体做法：发送密文的一方使用公钥进行加密处理‘秘钥’,对方收到被加密的信息后，在使用自己的私有秘钥进行解密。这样可以确保交换的秘钥是安全的前提下，之后使用对称加密方式进行报文交换。所以 HTTPS 是采用对称加密和非对称加密量这几个的混合加密机制")]),v._v(" "),t("h2",{attrs:{id:"数字签名-第三方认证"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数字签名-第三方认证"}},[v._v("#")]),v._v(" 数字签名 + 第三方认证")]),v._v(" "),t("p",[v._v("数据无法被解密，但可能被篡改, 所以要校验数字签名")]),v._v(" "),t("h3",{attrs:{id:"数字签名如何生成"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数字签名如何生成"}},[v._v("#")]),v._v(" 数字签名如何生成")]),v._v(" "),t("blockquote",[t("p",[v._v("一段文本 ----hash 函数----\x3e 消息摘要 ----私钥加密----\x3e 数字签名")])]),v._v(" "),t("p",[v._v("将一段文本先用 Hash 函数生成消息摘要，然后用发送者的私钥加密生成数字签名，与原文一起传送给接收者。接下来就是接收者校验数字签名的流程了")]),v._v(" "),t("h3",{attrs:{id:"校验数字签名"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#校验数字签名"}},[v._v("#")]),v._v(" 校验数字签名")]),v._v(" "),t("blockquote",[t("p",[v._v("数字签名----发送者的公钥解密----\x3e消息摘要 1\n原文----hash 函数----\x3e消息摘要 2\n比对 消息摘要 1 和 消息摘要 2")])]),v._v(" "),t("p",[v._v("如果相同，则说明收到的信息是完整的，在传输过程中没有被修改，\n否则说明信息被修改过，因此数字签名能够验证信息的完整性")]),v._v(" "),t("blockquote",[t("p",[v._v("举个例子：假设消息传递在 Kobe，James 两人之间发生。James 将消息连同数字签名一起发送给 Kobe，Kobe 接收到消息后，通过校验数字签名，就可以验证接收到的消息就是 James 发送的。当然，这个过程的前提是 Kobe 知道 James 的公钥。问题来了，和消息本身一样，公钥不能在不安全的网络中直接发送给 Kobe，或者说拿到的公钥如何证明是 James 的？")])]),v._v(" "),t("p",[v._v("此时就需要引入了证书颁发机构（Certificate Authority，简称 CA），CA 数量并不多，Kobe 客户端内置了所有受信任 CA 的证书。CA 对 James 的公钥（和其他信息）数字签名后生成证书")]),v._v(" "),t("p",[t("img",{attrs:{src:"https://gcore.jsdelivr.net/gh/wu529778790/image/blog/20210723153952.png",alt:"20210723153952"}})]),v._v(" "),t("p",[v._v("客户端无法识别传回公钥是中间人的，还是服务器的，也就是客户端可能拿到的公钥是假的，这是问题的根本，我们可以通过某种规范可以让客户端和服务器都遵循某种约定，那就是通过「第三方认证的方式」")]),v._v(" "),t("p",[t("img",{attrs:{src:"https://gcore.jsdelivr.net/gh/wu529778790/image/blog/20210723154241.png",alt:"20210723154241"}})]),v._v(" "),t("h3",{attrs:{id:"数字证书认证机构的业务流程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数字证书认证机构的业务流程"}},[v._v("#")]),v._v(" 数字证书认证机构的业务流程")]),v._v(" "),t("ol",[t("li",[v._v("服务器的运营人员向第三方机构 CA 提交公钥、组织信息、个人信息(域名)等信息并申请认证")]),v._v(" "),t("li",[v._v("CA 通过线上、线下等多种手段验证申请者提供信息的真实性，如组织是否存在、企业是否合法，是否拥有域名的所有权等")]),v._v(" "),t("li",[v._v("如信息审核通过，CA 会向申请者签发认证文件-证书.证书包含以下信息：申请者公钥、申请者的组织信息和个人信息、签发机构 CA 的信息、有效时间、证书序列号等信息的明文，同时包含一个签名。其中签名的产生算法：首先，使用散列函数计算公开的明文信息的信息摘要，然后，采用 CA 的私钥对信息摘要进行加密，密文即签名; 【数字签名生成的过程】")]),v._v(" "),t("li",[v._v("客户端 Client 向服务器 Server 发出请求时，Server 返回证书文件;")]),v._v(" "),t("li",[v._v("客户端 Client 读取证书中的相关的明文信息，采用相同的散列函数计算得到信息摘要，然后，利用对应 CA 的公钥解密签名数据，对比证书的信息摘要，如果一致，则可以确认证书的合法性，即服务器的公开密钥是值得信赖的。【校验数字签名的过程】")]),v._v(" "),t("li",[v._v("客户端还会验证证书相关的域名信息、有效时间等信息; 客户端会内置信任 CA 的证书信息(包含公钥)，如果 CA 不被信任，则找不到对应 CA 的证书，证书也会被判定非法。")])]),v._v(" "),t("h3",{attrs:{id:"如果仅仅是第三方认证-没有数字签名-只是对网站信息进行第三方机构私钥加密"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#如果仅仅是第三方认证-没有数字签名-只是对网站信息进行第三方机构私钥加密"}},[v._v("#")]),v._v(" 如果仅仅是第三方认证，没有数字签名（只是对网站信息进行第三方机构私钥加密）")]),v._v(" "),t("p",[v._v("第三方认证机构是一个公开的平台，中间人可以去获取。")]),v._v(" "),t("p",[v._v("数字签名：将网站的信息，通过特定的算法加密，比如 MD5,加密之后，再通过服务器的私钥进行加密，形成「加密后的数字签名」。")]),v._v(" "),t("p",[t("img",{attrs:{src:"https://gcore.jsdelivr.net/gh/wu529778790/image/blog/20210723171049.png",alt:"20210723171049"}})]),v._v(" "),t("p",[v._v("从上面我们知道，因为没有比对过程，所以中间人也向第三方认证机构进行申请，然后拦截后把所有的信息都替换成自己的，客户端仍然可以解密，并且无法判断这是服务器的还是中间人的，最后造成数据泄露")]),v._v(" "),t("h3",{attrs:{id:"数字签名的作用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数字签名的作用"}},[v._v("#")]),v._v(" 数字签名的作用")]),v._v(" "),t("ol",[t("li",[v._v("能确定消息确实是由发送方签名并发出来的，因为别人假冒不了发送方的签名")]),v._v(" "),t("li",[v._v("数字签名能确定消息的完整性,证明数据是否未被篡改过")])]),v._v(" "),t("h3",{attrs:{id:"client-是如何去对比两者数字签名"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#client-是如何去对比两者数字签名"}},[v._v("#")]),v._v(" Client 是如何去对比两者数字签名")]),v._v(" "),t("ol",[t("li",[v._v("浏览器会去安装一些比较权威的第三方认证机构的公钥，比如 VeriSign、Symantec 以及 GlobalSign 等等")]),v._v(" "),t("li",[v._v("验证数字签名的时候，会直接从本地拿到相应的第三方的公钥，对私钥加密后的数字签名进行解密得到真正的签名。")]),v._v(" "),t("li",[v._v("然后客户端利用签名生成规则进行签名生成，看两个签名是否匹配，如果匹配认证通过，不匹配则获取证书失败。")])]),v._v(" "),t("h3",{attrs:{id:"小结"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#小结"}},[v._v("#")]),v._v(" 小结")]),v._v(" "),t("ul",[t("li",[v._v("CA 是颁发证书机构（Certificate Authority）的简称")]),v._v(" "),t("li",[v._v("客户端会内置信任 CA 的证书信息(包含公钥)，服务端返回的证书中有申请者公钥")]),v._v(" "),t("li",[v._v("证书的合法性取决于对比信息摘要")]),v._v(" "),t("li",[v._v("CA 是否信任依赖于客户端内置信任的 CA")]),v._v(" "),t("li",[v._v("公钥是从服务器请求来的")]),v._v(" "),t("li",[v._v("数字签名的生成：网站信息通过特定的算法加密，比如 MD5， 加密之后，用第三方机构的私钥（Server 的私钥）再次加密")]),v._v(" "),t("li",[v._v("数字证书包含两个特别重要的信息：网站公钥、数字签名")]),v._v(" "),t("li",[v._v("通信方身份可能被伪装 —— 第三方证书")]),v._v(" "),t("li",[v._v("数据无法被解密，但可能被篡改，解决报文可能遭篡改问题 —— 校验数字签名")]),v._v(" "),t("li",[v._v("如果仅仅是第三方认证，没有数字签名（只是对网站信息进行第三方机构私钥加密） ，造成数据泄露，所以 HTTPS 通过【证书 + 数字签名】来保证安全")])]),v._v(" "),t("h2",{attrs:{id:"https-工作流程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#https-工作流程"}},[v._v("#")]),v._v(" HTTPS 工作流程")]),v._v(" "),t("p",[t("img",{attrs:{src:"https://gcore.jsdelivr.net/gh/wu529778790/image/blog/20210723171456.png",alt:"20210723171456"}})]),v._v(" "),t("ol",[t("li",[v._v("Client 发起一个 HTTPS 请求，连接 443 端口。这个过程可以理解成是【请求公钥的过程】")]),v._v(" "),t("li",[v._v("Server 端收到请求后，会把申请好的数字证书（也可以认为是公钥证书）返回给 Client")]),v._v(" "),t("li",[v._v("浏览器安装后会自动带一些权威第三方机构公钥，使用匹配的公钥对数字签名进行解密。根据签名生成的规则对网站信息进行本地签名生成，然后两者比对【（解密后的签名和对网站信息用 hash 函数生成的签名比对，其实这也是数字签名校验的过程，上面写的数字签名校验实例没有经过 CA）】。通过比对两者签名，匹配则说明认证通过【（也可以说是证书合法，并且客户端内置的 CA 是信任的）】，不匹配则获取证书失败")]),v._v(" "),t("li",[v._v("在安全拿到服务器公钥后，客户端 Client 使用伪随机数生成器随机生成一个对称密钥，使用【服务器公钥】（证书的公钥）加密这个【对称密钥】，发送给 Server(服务器)")]),v._v(" "),t("li",[v._v("服务器 Server 通过自己的私钥，对信息解密，至此得到了【对称密钥】，此时两者都拥有了相同的【对称密钥】，接下来，就可以通过该对称密钥对传输的信息加密/解密啦")]),v._v(" "),t("li",[v._v("Server 使用对称密钥加密“明文内容 A”，发送给 Client")]),v._v(" "),t("li",[v._v("Client 使用对称密钥解密响应的密文，得到“明文内容 A”")]),v._v(" "),t("li",[v._v("Client 再次发起 HTTPS 的请求，使用对称密钥加密请求的“明文内容 B”，然后 Server 使用对称密钥解密密文，得到“明文内容 B”")])]),v._v(" "),t("h3",{attrs:{id:"请求到公钥的作用"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#请求到公钥的作用"}},[v._v("#")]),v._v(" 请求到公钥的作用")]),v._v(" "),t("ol",[t("li",[v._v("解密数字签名（匹配的公钥是服务器拿到的跟浏览器自带的第三方机构公钥匹配成功的公钥）")]),v._v(" "),t("li",[v._v("加密 Client 使用伪随机数随机生成的一对称秘钥（这步骤开始对称加密，把对称秘钥发送给 Server，这个步骤经过非对称加密之后变成安全的了）")])]),v._v(" "),t("h3",{attrs:{id:"https-工作中啥时候是非对称加密-啥时候是对称加密"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#https-工作中啥时候是非对称加密-啥时候是对称加密"}},[v._v("#")]),v._v(" HTTPS 工作中啥时候是非对称加密，啥时候是对称加密")]),v._v(" "),t("p",[v._v("Server 安全拿到对称秘钥之后，也就是 Client 和 Server 都拥有了相同的【对称秘钥】之后，开始对称加密；认之前是非对称加密。换句话说，在交换密钥环节使用非对称加密方式，之后的建立通信交换报文阶段则使用对称加密方式。")]),v._v(" "),t("h2",{attrs:{id:"http-和-https-区别"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#http-和-https-区别"}},[v._v("#")]),v._v(" HTTP 和 HTTPS 区别")]),v._v(" "),t("ul",[t("li",[v._v("HTTP 是明文传输协议，HTTPS 协议是由 SSL+HTTP 协议构建的可进行加密传输、身份认证的网络协议，比 HTTP 协议安全。")]),v._v(" "),t("li",[v._v("HTTPS 比 HTTP 更加安全，对搜索引擎更友好，利于 SEO,谷歌、百度优先索引 HTTPS 网页")]),v._v(" "),t("li",[v._v("HTTPS 需要用到 SSL 证书，而 HTTP 不用【（HTTPS 是安装 SSL 的服务器，HTTP 是未安装 SSL 的服务器）】")]),v._v(" "),t("li",[v._v("HTTPS 标准端口 443，HTTP 标准端口 80")]),v._v(" "),t("li",[v._v("HTTPS 基于传输层，HTTP 基于应用层")]),v._v(" "),t("li",[v._v("HTTPS 在浏览器显示绿色安全锁，HTTP 没有显示")])]),v._v(" "),t("h2",{attrs:{id:"总结"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[v._v("#")]),v._v(" 总结")]),v._v(" "),t("p",[v._v("HTTPS 就是使用 SSL/TLS 协议进行加密传输大致流程：")]),v._v(" "),t("p",[v._v("客户端拿到服务器的公钥（是正确的），然后客户端随机生成一个「对称加密的秘钥」，使用「该公钥」加密，传输给服务端，服务端再通过解密拿到该「对称秘钥」，后续的所有信息都通过该「对称秘钥」进行加密解密，完成整个 HTTPS 的流程。「第三方认证」，最重要的是「数字签名」，避免了获取的公钥是中间人的")]),v._v(" "),t("h2",{attrs:{id:"参考链接"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#参考链接"}},[v._v("#")]),v._v(" 参考链接")]),v._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://juejin.cn/post/6942671833304924197",target:"_blank",rel:"noopener noreferrer"}},[v._v("https://juejin.cn/post/6942671833304924197"),t("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=s.exports}}]);