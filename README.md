**# PiXeler**





**## Description**



Pixel-ler is an ecommerce platform build for photographers and art photography lover, meant to sell an buy limited prints of their work.





**## User Stories**



\- ***\*Home Page\**** As any user you can see the most wanted themes and feature artist an new prints.

\- ***\*Search\**** As a user I can search in the platform by theme of picture, artist, print size and title of pictures

\- ***\*List of Pics\**** As a user I can see the list of all pictures.

\- ***\*Detail Pic Page\**** As a user I can see all the information related with the protographs I wanna bye. I can see artist, type of paper, format and description. I can also added to my shopping card to buy after.

\- ***\*Artist Profile Page\**** As an artist you can have your own resume page with statemen and selling photographs and users can visit

\- ***\*Artist Profile Page\**** As an artist you can have your own resume page with statemen and selling photographs and users can visit

\- ***\*Signup\**** As a buyer and artist seller I can sign up in the platform so that I can buy and publish my selling prints. As an artist I can sign up uploading a more detail in

\- ***\*Login\**** As a user I can login to the platform so that I can search for alumni/jobs/events

\- ***\*Logout\**** As a user I can logout from the platform so no one else can use it

\- ***\*Private User profile\**** As a user/buyer I have a profile with all my information and shopping history.

\- ***\*Private Artist profile\**** As an artist I have a profile with all my information and list of selling picture that I can edit and delete

\- ***\*Add Photograph\**** I can add pictures to sell and include detail information about it. Also I am also able to edit it and deleted.

\- ***\*404:\**** As an anon/user I can see a 404 page if I try to reach a page that does not exist







**## Wireframes**



\- ![./public/images/wireframes-pixeller.jpg](C:/Users/Claudia Layrisse/Desktop/ironhack\projects\project3-pixeller\pixeller-backend\wireframe-pixeller.jpg)







**## Back-end**

| HTTP  Method | URL              | Request Body                                                 | Request Body | Success status | Description                                                  |
| ------------ | ---------------- | ------------------------------------------------------------ | ------------ | -------------- | ------------------------------------------------------------ |
| GET          | /auth/me         | Saved  session                                               | 200          | 404            | Check  if user is logged                                     |
| POST         | /auth/signup     | { name,  email, password, repeat password } seller y/n if seller:true {lasName,  address, phoneNum} | 201          | 401   404      | Checks  if fields not empty (422) and user not exists (409), then create user with  encrypted password, and store user in session |
| POST         | /auth/login      | {email,  password }                                          | 200          | 401            | Checks  if fields not empty (422), if user exists (404), and if password matches  (404), then stores user in session |
| POST         | /auth/logout     | (empty)                                                      | 204          | 400            | Logs  out the user                                           |
| PUT          | /user/edit/:id   | {name,  email, password, repeat password, lasName, address, phoneNum, seller y/n,  sellerInfo, sellerContact, sellerAvatar } | 201          |                | Edits  and seds new user edit-profile                        |
| DELETE       | /user/delete/:id |                                                              | 204          |                | Deletes  user profile                                        |
| POST         | /pic/create      | { picture, title, format, description,  tags, maxPrints, date, userArtist } | 201          |                | Creates  picture                                             |
| PUT          | /pic/edit/:id    | { picture, title, format, description,  tags, maxPrints, date, userArtist } | 201          |                | Edits  picture                                               |
| DELETE       | /pic/delete      |                                                              | 204          |                | Deletes  picture                                             |
| POST         | /item/listing    | ONE  {print/:id} to add to {User.buyerCheckout} y restarla del arr | 201          |                |                                                              |
| POST         | /item/listing    | {User.buyerCheckout}  could delet or pass to wanted list     | 201          |                |                                                              |



**## Models**

```js
const orderDetailsSchema = new Schema({
    orderNumber: String,
    buyer: {type: Schema.Types.ObjectId, ref: 'User'},
    items: [{type: Schema.Types.ObjectId, ref: 'SellingPic'}],
    shippingAddress: { type: String, required: true},
    shippingName: { type: String, required: true},
    shippingPhoneNum: { type: String, required: true},
    dateOfOrder: Date,
    payingPethod: { type: String, enum: ['Paypal', 'ApplePay', 'MasterCard', 'Visa'] },
    orderSummary: [{
        itemsSubtotal:{type: Number},
        shippingCost:{type: Number},
        totalBeforeTax: {type: Number},
        tax: {type: Number},
        grandTotal: {type: Number},

    }]

});
```

```js
const sellingPicSchema = new Schema({
    picture: { type: String, default: "./../wireframe-pixeller.jpg"}, //required: true 
    title: String,
    formats: { type: String, enum: ['3x5', '2x1', '2x3'] },
    tags: [{ type: String }],
    description: String,
    price: Number,
    artistInfo: String, //{type: Schema.Types.ObjectId, ref: 'User' },
    maxPrints: Number,
    date: Date,
    comments: [{
        review: String,
        creator: { type: Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 1, max: 5 }
    }],
    soldPrints: [
        {
            buyer:[{ type: Schema.Types.ObjectId, ref: 'User' }], 
            quantity: Number
        }
    ]


});
```

```js
const userSchema = new Schema({
    
    username: { type: String, required: true },
    lastName: { type: String, default:"" }, //how do I do to have this field require for seller and not a buyer
    address: { type: String, default:"" }, 
    phoneNum: { type: Number, default: null },
    email: {type: String, match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, required: true, unique: true },
    password: { type: String, minlength: 6, required: true },

    buyCheckout: [{type: Schema.Types.ObjectId, ref: 'SellingPic' }],
    buyLater: [{type: Schema.Types.ObjectId, ref: 'SellingPic' }], 
    shipInfoID: [{type: Schema.Types.ObjectId, ref: 'Shipping' }],

    seller: { type: Boolean, default: false },
    sellerAvatar: { type: String, default: '/images/icon-userdefault.png' },
    sellingPic: [{ type: Schema.Types.ObjectId, ref: 'SellingPic' }],
    sellerArtistName: { type: String, default:"" },
    sellerInfo: { type: String, default:"" }, 
    sellerContact: { type: String, default:"" },
});
```



**## Front-end and Components **



| Path             | Component        |
| ---------------- | ---------------- |
| /                | Home             |
| /signup          | Signup           |
| /login           | Login            |
| /logout          |                  |
| /user/profile    | Private          |
| /user/edit       | UserEdit         |
| /pic/create      | PicCreate        |
| /pic/edit/:id    | PicEdit          |
| /pic/detail.:id  | PicDetail        |
| /profile/car/:id | ListingCar       |
| /profile/car/:id | ListingCheckout  |
| /precheckout     | CheckoutItems    |
| /shipping        | CheckoutShipping |
| /checkout        | CheckoutTotal    |
|                  | NavBar           |
|                  | SearchBar        |

\- 









**## Links**



**### Trello/Kanban**



https://trello.com/b/J4VxD7bD/pixeller



**### Git**



BackEnd



https://github.com/clayrisse/pixeller-backend



FronEnd



https://github.com/clayrisse/pixeller-frontend





**### Slides**

https://docs.google.com/presentation/d/1rbvlq6dxbHmLE7H8ho9RnkIn--itfRm8Xz_CU5-lMd8/edit?usp=sharing