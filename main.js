let wdg;
function pay()
{
  const email = document.getElementById("email").value
  const phone = document.getElementById("phone").value
  const name = document.getElementById("name").value
  const surname = document.getElementById("surname").value
  const lastname = document.getElementById("lastname").value
  const descripton = document.getElementById("decript").value

  var widget = new cp.CloudPayments();
  wdg = widget
  if (document.getElementById("subsCheckbox").checked)
  {

  var receipt = {
  Items: [//товарные позиции
      {
        label: 'Паймон в Геншине', //наименование товара
        price: 10.00, //цена
        quantity: 1.00, //количество
        amount: 10.00, //сумма
        vat: 0, //ставка НДС
        method: 0, // тег-1214 признак способа расчета - признак способа расчета
        object: 0, // тег-1212 признак предмета расчета - признак предмета товара, работы, услуги, платежа, выплаты, иного предмета расчета
      }
    ],
  taxationSystem: 0, //система налогообложения; необязательный, если у вас одна система налогообложения
  email: email, //e-mail покупателя, если нужно отправить письмо с чеком
  phone: phone, //телефон покупателя в любом формате, если нужно отправить сообщение со ссылкой на чек
  isBso: false, //чек является бланком строгой отчетности
  amounts:
  {
    electronic: 10.00, // Сумма оплаты электронными деньгами
    advancePayment: 0.00, // Сумма из предоплаты (зачетом аванса) (2 знака после точки)
    credit: 0.00, // Сумма постоплатой(в кредит) (2 знака после точки)
    provision: 0.00 // Сумма оплаты встречным предоставлением (сертификаты, др. мат.ценности) (2 знака после точки)
  }
  };

  var data = {};
  data.CloudPayments = {
    CustomerReceipt: receipt, //чек для первого платежа
    recurrent: {
    interval: 'Month',
    period: 1, 
    customerReceipt: receipt //чек для регулярных платежей
  }
  }; //создание ежемесячной подписки

  widget.pay('auth', { // options
    publicId: 'pk_aff17de359b486f45c12b4e4fdab0', //id из личного кабинета
    description: 'Ежемесячный донат в Геншине', //назначение
    amount: 10, //сумма
    currency: 'RUB', //валюта
    accountId: email, //идентификатор плательщика (обязательно для создания подписки)
    data: data,
    payer: { 
            firstName: name,
            lastName: surname,
            middleName: lastname,
            birth: '1955-02-24',
            address: 'тестовый проезд дом тест',
            street: 'Lenina',
            city: 'MO',
            country: 'RU',
            phone: '123',
            postcode: '345'
        }
  },
  function (options) { // success
  //действие при успешной оплате
  },
  function (reason, options) { // fail
  //действие при неуспешной оплате
  });
  }
  else 
  {
  
  widget.charge('auth', // или 'charge'
    { //options
        publicId: 'pk_aff17de359b486f45c12b4e4fdab0', //id из личного кабинета
        description: 'Донат Геншина', //назначение
        amount: 10, //сумма
        currency: 'RUB', //валюта
        accountId: email, //идентификатор плательщика (необязательно)
        email: email,
        skin: "mini", //дизайн виджета (необязательно)
        autoClose: 3, //время в секундах до авто-закрытия виджета (необязательный)
        data: {
            myProp: 'myProp value'
        },
        configuration: {
        },
        payer: { 
            firstName: name,
            lastName: surname,
            middleName: lastname,
            birth: '1955-02-24',
            address: 'тестовый проезд дом тест',
            street: 'Lenina',
            city: 'MO',
            country: 'RU',
            phone: '123',
            postcode: '345'
        }
    },
    {
        onSuccess: function (options) { // success
            //действие при успешной оплате
        },
        onFail: function (reason, options) { // fail
            //действие при неуспешной оплате
        },
        onComplete: function (paymentResult, options) { //Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
            //например вызов вашей аналитики
        }
    })
  }
}
