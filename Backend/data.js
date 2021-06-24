const products = [
    {
        name: "Samsung Galaxy A32",
        mainImage:"https://res.cloudinary.com/saralkarki/image/upload/v1620219359/MobiHub/Samsung/Samsung%20Galaxy%20A32/samsung-galaxy-a32-4g-thumb-tim-600x600-600x600_vggeb6.jpg",
        colors:[
            {
                color:"black",
                image:"https://res.cloudinary.com/saralkarki/image/upload/v1620219463/MobiHub/Samsung/Samsung%20Galaxy%20A32/samsung-galaxy-a32-4g-thumb-den-600x600-200x200_sl0esw.jpg"
            },
            {
                color:"blue",
                image:"https://res.cloudinary.com/saralkarki/image/upload/v1620219527/MobiHub/Samsung/Samsung%20Galaxy%20A32/samsung-galaxy-a32-4g-thumb-xanh-600x600-200x200_xvhanx.jpg",
            },
            {
                color:"white",
                image:"https://res.cloudinary.com/saralkarki/image/upload/v1620219581/MobiHub/Samsung/Samsung%20Galaxy%20A32/samsung-galaxy-a32-4g-thumb-trang-600x600-200x200_kh9iqu.jpg",
            },
        ],
        version: [
            {
                version:"128 GB",
                price:"339.99"
            }
        ],
        quantity:100,
        brand:"Samsung",
        sale:12,
        ratings:3.9,
        screen:"Super AMOLED, 6.4",
        os:"Android 10",
        rearCamera:"Main 64 MP & Secondary 8 MP, 5MP, 5MP",
        frontCamera:"20 MP",
        ram:"6 GB",
        description:"Features of Samsung Galaxy A32 Standard product set: Box, Instruction manual, SIM card, Type C cable, Type A removable fast charger Samsung Galaxy A32 4G  is a mid-range phone but possesses many outstanding advantages with a large sharp screen, a set of 64 MP cameras and high-performance processor and is sold at a very good price"
    },
    {
        name: "Samsung Galaxy M51",
        mainImage:"https://res.cloudinary.com/saralkarki/image/upload/v1620220125/MobiHub/Samsung/Samsung%20Galaxy%20M51%20phone/samsung-galaxy-m51-trang-new-600x600-600x600_okwgyi.jpg",
        colors:[
            {
                color:"white",
                image:"https://res.cloudinary.com/saralkarki/image/upload/v1620220125/MobiHub/Samsung/Samsung%20Galaxy%20M51%20phone/samsung-galaxy-m51-trang-new-600x600-600x600_okwgyi.jpg"
            },
            {
                color:"black",
                image:"https://res.cloudinary.com/saralkarki/image/upload/v1620220235/MobiHub/Samsung/Samsung%20Galaxy%20M51%20phone/samsung-galaxy-m51-den-new-600x600-200x200_oljfxh.jpg",
            }
           
        ],
        version: [
            {
                version:"128 GB",
                price:"369.99"
            }
        ],
        quantity:100,
        brand:"Samsung",
        sale:12,
        ratings:4.7,
        screen:"Super AMOLED, 6.4",
        os:"Android 10",
        rearCamera:"Main 64 MP & Secondary 12 MP, 5 MP, 5 MP",
        frontCamera:"32 MP",
        ram:"8 GB",
        description:"Samsung continues to launch a new smartphone of the Galaxy M generation called Samsung Galaxy M51 . This new design, although located in the mid-range segment, has been upgraded and improved by Samsung with an ultra-wide-angle camera, super battery capacity and luxurious and trendy appearance."
    },
    
    {
        name: "Samsung Galaxy S21",
        mainImage:"https://res.cloudinary.com/saralkarki/image/upload/v1620221098/MobiHub/Samsung/Samsung%20Galaxy%20S21/samsung-galaxy-s21-tim-600x600_prffw5.jpg",
        colors:[
            {
                color:"silver",
                image:"https://res.cloudinary.com/saralkarki/image/upload/v1620221098/MobiHub/Samsung/Samsung%20Galaxy%20S21/samsung-galaxy-s21-tim-600x600_prffw5.jpg"
            },
            {
                color:"white",
                image:"https://res.cloudinary.com/saralkarki/image/upload/v1620221189/MobiHub/Samsung/Samsung%20Galaxy%20S21/samsung-galaxy-s21-trang-200x200_zdc2ys.jpg",
            }
           
        ],
        version: [
            {
                version:"S21",
                price:"900"
            },
            {
                version:"S21 +",
                price:"1000"
            }
        ],
        quantity:100,
        brand:"Samsung",
        sale:12,
        ratings:4.7,
        screen:"Super AMOLED, 6.4",
        os:"Android 11",
        rearCamera:"Main 12 MP & Secondary 64 MP, 5 MP, 5 MP",
        frontCamera:"12 MP",
        ram:"8 GB",
        description:"Earlier this year, Samsung launched three new smartphones comprising its 2021 flagship Galaxy S21 series. The Galaxy S21 Ultra is the top-of-the-line model and showcases some impressive camera hardware, which will appeal to those looking for the ultimate flexibility, no matter the cost"
    },
    {
        name: "Samsung Galaxy Note 10",
        mainImage:"https://res.cloudinary.com/saralkarki/image/upload/v1620220710/MobiHub/Samsung/Samsung%20Galaxy%20Note%2010%2B/samsung-galaxy-note-10-plus-silver-new-600x600_ragt3x.jpg",
        colors:[
            {
                color:"silver",
                image:"https://res.cloudinary.com/saralkarki/image/upload/v1620220710/MobiHub/Samsung/Samsung%20Galaxy%20Note%2010%2B/samsung-galaxy-note-10-plus-silver-new-600x600_ragt3x.jpg"
            },
            {
                color:"black",
                image:"https://res.cloudinary.com/saralkarki/image/upload/v1620220762/MobiHub/Samsung/Samsung%20Galaxy%20Note%2010%2B/samsung-galaxy-note-10-plus-black-new-200x200_zmcjj5.jpg",
            }
           
        ],
        version: [
            {
                version:"Note 10 +",
                price:"969.99"
            },
            {
                version:"Note 10 Lite",
                price:"239.99"
            }
        ],
        quantity:100,
        brand:"Samsung",
        sale:12,
        ratings:5,
        screen:"Dynamic AMOLED, 6.8, Quad HD+ (2K+)",
        os:"Android 9",
        rearCamera:"12 MP Main & Secondary 12 MP, 16 MP, TOF 3D",
        frontCamera:"10 MP",
        ram:"12 GB",
        description:"It looks quite similar, but Samsung Galaxy Note 10+ has quite a few differences compared to the Galaxy Note 10 and this is considered one of the most worth buying machines in 2019, especially for those who like a large screen, top quality camera."
    },
    {
        name: "Xiaomi Redmi 9T",
        mainImage:"https://res.cloudinary.com/saralkarki/image/upload/v1620274935/MobiHub/MI/Redmi%209T/redmi-9t-den-600x600-600x600_zf8wh8.jpg",
        colors:[
        
            {
                color:"Gray",
                image:"https://res.cloudinary.com/saralkarki/image/upload/v1620274935/MobiHub/MI/Redmi%209T/redmi-9t-den-600x600-600x600_zf8wh8.jpg",
            },
            {
                color:"Green",
                image:"https://res.cloudinary.com/saralkarki/image/upload/v1620275028/MobiHub/MI/Redmi%209T/redmi-9t-xanhla-600x600-200x200_fexltm.jpg"
            },
            {
                color:"Orange",
                image: "https://res.cloudinary.com/saralkarki/image/upload/v1620275064/MobiHub/MI/Redmi%209T/redmi-9t-cam-600x600-200x200_qt3473.jpg"
            }
           
        ],
        version: [
            {
                version:"128 GB",
                price:"399"
            },
            {
                version:"64 GB",
                price:"259"
            },
        ],
        quantity:100,
        brand:"Xiaomi",
        sale:12,
        ratings:5,
        screen:"IPS LCD, 6.53, Full HD+",
        os:"Android 11",
        rearCamera:"Main 48 MP & Secondary 8 MP, 2 MP",
        frontCamera:"8 MP",
        ram:"4 GB",
        description:"Recently, Xiaomi has officially introduced a new smartphone with the name Xiaomi Redmi 9T . The quintessential inheritance of the previous versions helps this 'baby phone' promises to be a 'mid-range blockbuster' that please users. "
    },
    {
        name: "Samsung Galaxy Quantam 2",
        mainImage:"https://res.cloudinary.com/saralkarki/image/upload/v1620223110/MobiHub/Samsung/Samsung%20Galaxy%20Quantum2/samsung-galaxy-quantum2-1-600x600_bg6sej.jpg",
        colors:[
        
            {
                color:"black",
                image:"https://res.cloudinary.com/saralkarki/image/upload/v1620223110/MobiHub/Samsung/Samsung%20Galaxy%20Quantum2/samsung-galaxy-quantum2-1-600x600_bg6sej.jpg",
            }
           
        ],
        version: [
            {
                version:"128 GB",
                price:"600"
            }
        ],
        quantity:100,
        brand:"Samsung",
        sale:12,
        ratings:5,
        screen:"Dynamic AMOLED, 6.8, Quad HD+ (2K+)",
        os:"Android 11",
        rearCamera:"Main 64 MP & Secondary 12 MP, 5 MP",
        frontCamera:"10 MP",
        ram:"6 GB",
        description:"Samsung Galaxy Quantum 2 is a new smartphone by Samsung, the price of Galaxy Quantum 2 in USA is USD 600, on this page you can find the best and most updated price of Galaxy Quantum 2 in USA with detailed specifications and features."
    },
    {
        name: "Xiaomi Redmi Note 10",
        mainImage:"https://res.cloudinary.com/saralkarki/image/upload/v1620275521/MobiHub/MI/Redmi%20Note%2010/xiaomi-redmi-note-10-thumb-green-600x600_ntavlj.jpg",
        colors:[
        
            {
                color:"Light Green",
                image:"https://res.cloudinary.com/saralkarki/image/upload/v1620275521/MobiHub/MI/Redmi%20Note%2010/xiaomi-redmi-note-10-thumb-green-600x600_ntavlj.jpg",
            },
            {
                color:"White",
                image:"https://res.cloudinary.com/saralkarki/image/upload/v1620275597/MobiHub/MI/Redmi%20Note%2010/xiaomi-redmi-note-10-thumb-white-200x200_hsrsqz.jpg"
            }
           ],
        version: [
            {
                version:"128 GB",
                price:"499"
            },
            {
                version:"64 GB",
                price:"359"
            },
        ],
        quantity:100,
        brand:"Xiaomi",
        sale:12,
        ratings:5,
        screen:"IPS LCD, 6.53, Full HD+",
        os:"Android 11",
        rearCamera:"Main 48 MP & Secondary 8 MP, 2 MP",
        frontCamera:"13 MP",
        ram:"6 GB",
        description:"Highlights of Xiaomi Redmi Note 10 (6GB / 128GB) Xiaomi has launched a phone called Xiaomi Redmi Note 10 with the main highlight of the 48 MP quad-camera cluster, the powerful Snapdragon 678 dragon chip and many upgrades such as 5,000 mAh battery capacity and 33 W fast charging support. profit. "
    },
    {
        name: "Xiaomi Mi 11 Lite",
        mainImage:"https://res.cloudinary.com/saralkarki/image/upload/v1620276206/MobiHub/MI/Mi%2011%20Lite/xiaomi-mi-11-lite-4g-blue-600x600_v8r10l.jpg",
        colors:[
        
            {
                color:"Blue",
                image:"https://res.cloudinary.com/saralkarki/image/upload/v1620276206/MobiHub/MI/Mi%2011%20Lite/xiaomi-mi-11-lite-4g-blue-600x600_v8r10l.jpg",
            },
            {
                color:"Pink",
                image:"https://res.cloudinary.com/saralkarki/image/upload/v1620276395/MobiHub/MI/Mi%2011%20Lite/xiaomi-mi-11-lite-4g-pink-1-200x200_eme2ru.jpg"
            }
           ],
        version: [
            {
                version:"128 GB",
                price:"499"
            }
            
        ],
        quantity:100,
        brand:"Xiaomi",
        sale:12,
        ratings:5,
        screen:"IPS LCD, 6.53, Full HD+",
        os:"Android 11",
        rearCamera:"Main 64 MP & Secondary 8 MP, 5 MP",
        frontCamera:"16 MP",
        ram:"8 GB",
        description:"Xiaomi Mi 11 Lite is considered as a shortened version of Xiaomi Mi 11 5G launched not long ago. Inheriting many advantages of its seniors, Mi 11 Lite can completely respond well to common tasks easily and especially with an extremely thin and stylish design. "
    },
    {
        name: "Vivo Y20s",
        mainImage:"https://res.cloudinary.com/saralkarki/image/upload/v1620283812/MobiHub/Vivo%20/Vivo%20Y20s/vivo-y20s-xanh-1-600x600_vobsmx.jpg",
        colors:[
        
            {
                color:"Blue",
                image:"https://res.cloudinary.com/saralkarki/image/upload/v1620283812/MobiHub/Vivo%20/Vivo%20Y20s/vivo-y20s-xanh-1-600x600_vobsmx.jpg",
            },
            {
                color:"Black",
                image:"https://res.cloudinary.com/saralkarki/image/upload/v1620283930/MobiHub/Vivo%20/Vivo%20Y20s/vivo-y20s-den-13-200x200_sci2xl.jpg"
            }
           ],
        version: [
            {
                version:"128 GB",
                price:"299"
            }
            
        ],
        quantity:100,
        brand:"Vivo",
        sale:12,
        ratings:5,
        screen:"IPS LCD, 6.51, Full HD+",
        os:"Android 10",
        rearCamera:"Main 13 MP & Secondary 2 MP, 2 MP",
        frontCamera:"8 MP",
        ram:"6 GB",
        description:"Y20 just launched not long ago, Vivo continues to release the Y20s . The new mid-range smartphone is upgraded with higher memory and RAM capacity for a smoother experience, comfortable storage, with an impressive beautiful design, large battery capacity to meet the needs of all-day entertainment. . "
    },
    {
        name: "Vivo X60s",
        mainImage:"https://res.cloudinary.com/saralkarki/image/upload/v1620284245/MobiHub/Vivo%20/Vivo%20X60s/vivo-x60s-5g-600x600_kagydn.jpg",
        colors:[
        
            {
                color:"Blue",
                image:"https://res.cloudinary.com/saralkarki/image/upload/v1620284245/MobiHub/Vivo%20/Vivo%20X60s/vivo-x60s-5g-600x600_kagydn.jpg",
            }
           ],
        version: [
            {
                version:"128 GB",
                price:"299"
            }
            
        ],
        quantity:100,
        brand:"Vivo",
        sale:12,
        ratings:5,
        screen:"IPS LCD, 6.51, Full HD+",
        os:"Android 10",
        rearCamera:"Main 48 MP & Secondary 13 MP, 5 MP",
        frontCamera:"32 MP",
        ram:"6 GB",
        description:"X60 just launched not long ago, Vivo continues to release the X60s . The new mid-range smartphone is upgraded with higher memory and RAM capacity for a smoother experience, comfortable storage, with an impressive beautiful design, large battery capacity to meet the needs of all-day entertainment. . "
    },
    {
        name: "Vivo iQOO Z1X",
        mainImage:"https://res.cloudinary.com/saralkarki/image/upload/v1620299280/MobiHub/Vivo%20/Vivo%20iQOO%20Z1x/vivo-iqoo-z1x-600x600_sixfbi.jpg",
        colors:[
        
            {
                color:"Silver",
                image:"https://res.cloudinary.com/saralkarki/image/upload/v1620299280/MobiHub/Vivo%20/Vivo%20iQOO%20Z1x/vivo-iqoo-z1x-600x600_sixfbi.jpg",
            }
           ],
        version: [
            {
                version:"128 GB",
                price:"249"
            }
            
        ],
        quantity:100,
        brand:"Vivo",
        sale:12,
        ratings:5,
        screen:"IPS LCD, 6.57",
        os:"Android 10",
        rearCamera:"Main 48 MP & Secondary 8 MP, 2 MP",
        frontCamera:"8 MP",
        ram:"8 GB",
        description:"Vivo iQOO Z1X is a power-packed device featuring an excellent processor setup and massive 5000mAh battery, equipped with 33W Fast Charging technology"
    },
    {
        name: "Oppo Reno 5",
        mainImage:"https://res.cloudinary.com/saralkarki/image/upload/v1620299717/MobiHub/Oppo/Oppo%20Reno%205/oppo-reno5-trang-600x600-1-600x600_jnn4eq.jpg",
        colors:[
        
            {
                color:"Silver",
                image:"https://res.cloudinary.com/saralkarki/image/upload/v1620299717/MobiHub/Oppo/Oppo%20Reno%205/oppo-reno5-trang-600x600-1-600x600_jnn4eq.jpg",
            },
            {
                color:"Black",
                image:"https://res.cloudinary.com/saralkarki/image/upload/v1620299782/MobiHub/Oppo/Oppo%20Reno%205/oppo-reno5-den-600x600-1-200x200_abya7l.jpg"
            }
           ],
        version: [
            {
                version:"128 GB",
                price:"499"
            }
            
        ],
        quantity:100,
        brand:"Oppo",
        sale:12,
        ratings:5,
        screen:"AMOLED, 6.43",
        os:"Android 11",
        rearCamera:"Main 64 MP & Secondary 8 MP, 2 MP",
        frontCamera:"44 MP",
        ram:"8 GB",
        description:"OPPO  has just launched its latest generation OPPO Reno at the end of 2020.  OPPO Reno5  is an impressive combination of performance and design, giving users a  phone that  integrates many camera technologies. Top-notch, OPPO battery charger in a mid-range price."
    },
    {
        name: "Oppo A74",
        mainImage:"https://res.cloudinary.com/saralkarki/image/upload/v1620299989/MobiHub/Oppo/Oppo%20A74/oppo-a74-blue-9-600x600_okmjv0.jpg",
        colors:[
        
            {
                color:"Blue",
                image:"https://res.cloudinary.com/saralkarki/image/upload/v1620299989/MobiHub/Oppo/Oppo%20A74/oppo-a74-blue-9-600x600_okmjv0.jpg",
            },
            {
                color:"Black",
                image:"https://res.cloudinary.com/saralkarki/image/upload/v1620300057/MobiHub/Oppo/Oppo%20A74/oppo-a74-black-10-200x200_s7h1tu.jpg"
            }
           ],
        version: [
            {
                version:"128 GB",
                price:"559"
            }
            
        ],
        quantity:100,
        brand:"Oppo",
        sale:12,
        ratings:5,
        screen:"AMOLED, 6.43",
        os:"Android 11",
        rearCamera:"Main 48 MP & Secondary 2 MP, 2 MP",
        frontCamera:"16 MP",
        ram:"8 GB",
        description:"Around the first four months of 2021,  OPPO  has launched a variety of its products from low-end to high-end. In particular,  the recently announced OPPO A74 4G phone  in the mid-range segment is very noticeable with many features and the  smartphone  is an upgrade of the  OPPO A73  launched earlier."
    },
    {
        name: "Realme C25",
        mainImage:"https://res.cloudinary.com/saralkarki/image/upload/v1620301245/MobiHub/RealMe/Realme%20c25/realme-c25-blue-600x600-600x600_jahnp3.jpg",
        colors:[
        
            {
                color:"Blue",
                image:"https://res.cloudinary.com/saralkarki/image/upload/v1620301245/MobiHub/RealMe/Realme%20c25/realme-c25-blue-600x600-600x600_jahnp3.jpg",
            },
            {
                color:"Black",
                image:"https://res.cloudinary.com/saralkarki/image/upload/v1620301334/MobiHub/RealMe/Realme%20c25/realme-c25-black-600x600-200x200_twmeus.jpg"
            }
           ],
        version: [
            {
                version:"128 GB",
                price:"439.99"
            }
            
        ],
        quantity:100,
        brand:"Realme",
        sale:12,
        ratings:5,
        screen:"IPS LCD, 6.5",
        os:"Android 11",
        rearCamera:"Main 48 MP & Secondary 2 MP, 2 MP",
        frontCamera:"8 MP",
        ram:"4 GB",
        description:"Realme  officially launched its  new low-cost smartphone, Realme C25, focusing on gaming capabilities, the device has a 'huge' battery capacity, fast charging support and an impressive 48 MP triple camera system."
    },
    {
        name: "Realme 7",
        mainImage:"https://res.cloudinary.com/saralkarki/image/upload/v1620301586/MobiHub/RealMe/Realme%207/realme-7-blue-600x600_rklxls.jpg",
        colors:[
        
            {
                color:"Blue",
                image:"https://res.cloudinary.com/saralkarki/image/upload/v1620301586/MobiHub/RealMe/Realme%207/realme-7-blue-600x600_rklxls.jpg",
            },
            {
                color:"White",
                image:"https://res.cloudinary.com/saralkarki/image/upload/v1620301661/MobiHub/RealMe/Realme%207/realme-7-white-200x200_sou5xb.jpg"
            }
           ],
        version: [
            {
                version:"Realme 7i",
                price:"439.99"
            },
            {
                version:"Realme 7",
                price:"469.99"
            }
            
        ],
        quantity:100,
        brand:"Realme",
        sale:12,
        ratings:5,
        screen:"IPS LCD, 6.5",
        os:"Android 10",
        rearCamera:"Main 64 MP & Secondary 8 MP, 2 MP",
        frontCamera:"16 MP",
        ram:"8 GB",
        description:"Realme 7 , a  smartphone  inherited from Realme 6 with many outstanding improvements such as being equipped with Helio G95 chip, quality camera system, 5000 mAh battery with 30W fast charging capability."
    },
]


module.exports = products



