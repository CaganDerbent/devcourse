const Iyzipay = require('iyzipay');
const {v4:uuidv4} = require("uuid");

require("dotenv").config();

const payment = async(req,res)=>{

    const id = uuidv4(); // random id
    const {cardHolderName,cardNumber,expireMonth,expireYear,cvc,total,course} = req.body;
    console.log(req.body)

    const basketItems = [];

    

    for(let i = 0;i<course.length;i++){

        let obj = {
            id:"",
            name:"",
            category1:"",
            itemType: Iyzipay.BASKET_ITEM_TYPE.VIRTUAL,
            price:""
        }

        obj.id = course[i].courseId
        obj.name = course[i].title,
        obj.category1 = course[i].category,
        obj.price = course[i].price

        basketItems.push(obj);

      
        
    }

    
    
    
    const API_KEY = process.env.API_KEY;
    const SECRET_KEY = process.env.SECRET_KEY;
    var iyzipay = new Iyzipay({
        apiKey: API_KEY,
        secretKey: SECRET_KEY,
        uri: 'https://sandbox-api.iyzipay.com'
    });
    
    var request = {
        locale: Iyzipay.LOCALE.TR,
        conversationId: id,
        price: total,
        paidPrice: total,
        currency: Iyzipay.CURRENCY.TRY,
        installment: '1',
        //basketId: 'B67832',
        paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
        paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
        paymentCard: {
            cardHolderName: cardHolderName,
            cardNumber: cardNumber,
            expireMonth: expireMonth,
            expireYear: expireYear,
            cvc: cvc,
            registerCard: '0' // 1 ise kartı kaydeder.
        },
        buyer: {
            id: 'BY789',
            name: 'John',
            surname: 'Doe',
            gsmNumber: '+905350000000',
            email: 'email@email.com',
            identityNumber: '74300864791',
            lastLoginDate: '2015-10-05 12:43:35',
            registrationDate: '2013-04-21 15:12:09',
            registrationAddress: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
            ip: '85.34.78.112',
            city: 'Istanbul',
            country: 'Turkey',
            zipCode: '34732'
        },
        shippingAddress: {
            contactName: 'Jane Doe',
            city: 'Istanbul',
            country: 'Turkey',
            address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
            zipCode: '34742'
        },
        billingAddress: {
            contactName: 'Jane Doe',
            city: 'Istanbul',
            country: 'Turkey',
            address: 'Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1',
            zipCode: '34742'
        },
        basketItems: basketItems
    };
    
    iyzipay.payment.create(request, function (err, result) {

        const result2 = result;

        if(err !== null){
            res.status(500).json({err:err})
        }

        res.status(200).json({message:result2})

        console.log("ERROR: ",err, "RESULT: " ,result);
        
      
    });

}



module.exports = {
    payment
    
}



