app.controller('edittask', function($scope, $http, $location, $timeout, $routeParams) {

    var email = localStorage.getItem("email");
    $scope.email = email;
    var token = localStorage.getItem("token");

    $scope.update_lead = function() {
        var lead_source = $scope.lead_source;
        var lead_type = $scope.lead_type;
        var lead_status = $scope.lead_status;
        var sizeof_stages = $scope.sizeof_stages;
        var descriptions = $scope.description;
        var next_action = $scope.next_action;
        var Address = $scope.address;
        var state = $scope.state1;
        var city = $scope.cities;
        var ornagisation = $scope.orgname;
        var Client_email = $scope.client_email;
        var client_name = $scope.client_name;
        var Pincode = $scope.pincode;
        var mobilenumber = $scope.contact;
        var secondrycontact = $scope.scontact;
        var lead_department_status=$scope.lead_department_status;
        var next_action_date = next_action.toLocaleDateString();
        console.log(next_action_date);
        var next_action_date = next_action_date.toString();

        $http({
            method: "GET",
            url: "http://103.127.157.28:8443/updatelead?Status=" + lead_status + "&Stage=" + sizeof_stages + "&Source=" + lead_source +
                "&Type=" + lead_type + "&Nextaction=" + next_action_date + "&Token=" + token + "&useremail=" + email + "&leadnumber=" + $routeParams.lead_number + "&Description=" + descriptions +
                "&Name=" + client_name + "&Subject=" + ornagisation + "&Email=" + Client_email + "&Contact=" + mobilenumber + "&Scontact=" + secondrycontact + "&Address=" + Address + "&Pincode=" + Pincode + "&State=" + state + "&City=" +city+"&DepartmentStatus="+lead_department_status,
            transformRequest: function(obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },

            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(response) {

         
            if (response.data.status == true) {

                $location.path("/userDashboard");
            } else {
                $location.path("/edittask");
            }
        }, function(response) {
            alert('server error occured')
        })

    }
    $scope.init = function() {
        $http({
            method: "GET",
            url: "http://103.127.157.28:8443/getsinglelead?Useremail=" + email + "&Token=" + token + "&leadnumber=" + $routeParams.lead_number,
            transformRequest: function(obj) {
                var str = [];
                for (var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(response) {

            $scope.client_name = response.data.data.name
            $scope.client_email = response.data.data.email
            $scope.contact = response.data.data.mobile
            $scope.scontact = response.data.data.smobile
            $scope.address = response.data.data.address
            $scope.pincode = response.data.data.pincode
            $scope.state1 = response.data.data.state
            $scope.cities = response.data.data.city
            $scope.lead_source = response.data.data.source
            $scope.lead_type = response.data.data.type
            $scope.lead_status = response.data.data.status
            $scope.sizeof_stages = response.data.data.stage
            $scope.orgname = response.data.data.subject
            $scope.lead_department_status = response.data.data.departmentStatus
            $scope.description = response.data.data.description
            $scope.next_action = new Date(response.data.data.nextActionDate)



        }, function(response) {
            alert("some error occured")
        })
    }
    $scope.init()
    $scope.showMe = true;

    $scope.myFunc = function() {

        if ($scope.showMe = !$scope.showMe) {
            var x = document.querySelectorAll("#wrapper #content-wrapper");
            x[0].style.marginLeft = "89px";
        } else {
            var x = document.querySelectorAll("#wrapper #content-wrapper");
            x[0].style.marginLeft = "0px";
        }

    }
    $scope.states = {
        "MP": [
            "Agar Malwa",
            "Alirajpur",
            "Anuppur",
            "Ashoknagar",
            "Balaghat",
            "Barwani",
            "Betul",
            "Bhind",
            "Bhopal",
            "Burhanpur",
            "Chhatarpur",
            "Chhindwara",
            "Damoh",
            "Datia",
            "Dewas",
            "Dhar",
            "Dindori",
            "Guna",
            "Gwalior",
            "Harda",
            "Hoshangabad",
            "Indore",
            "Jabalpur",
            "Jhabua",
            "Katni",
            "Khandwa",
            "Khargone",
            "Mandla",
            "Mandsaur",
            "Morena",
            "Narsinghpur",
            "Neemuch",
            "Panna",
            "Raisen",
            "Rajgarh",
            "Ratlam",
            "Rewa",
            "Sagar",
            "Satna",
            "Sehore",
            "Seoni",
            "Shahdol",
            "Shajapur",
            "Sheopur",
            "Shivpuri",
            "Sidhi",
            "Singrauli",
            "Tikamgarh",
            "Ujjain",
            "Umaria",
            "Vidisha"
        ],
        "UP": [
            "Agra",
            "Aligarh",
            "Allahabad",
            "Ambedkar Nagar",
            "Amethi (Chatrapati Sahuji Mahraj Nagar)",
            "Amroha (J.P. Nagar)",
            "Auraiya",
            "Azamgarh",
            "Baghpat",
            "Bahraich",
            "Ballia",
            "Balrampur",
            "Banda",
            "Barabanki",
            "Bareilly",
            "Basti",
            "Bhadohi",
            "Bijnor",
            "Budaun",
            "Bulandshahr",
            "Chandauli",
            "Chitrakoot",
            "Deoria",
            "Etah",
            "Etawah",
            "Faizabad",
            "Farrukhabad",
            "Fatehpur",
            "Firozabad",
            "Gautam Buddha Nagar",
            "Ghaziabad",
            "Ghazipur",
            "Gonda",
            "Gorakhpur",
            "Hamirpur",
            "Hapur (Panchsheel Nagar)",
            "Hardoi",
            "Hathras",
            "Jalaun",
            "Jaunpur",
            "Jhansi",
            "Kannauj",
            "Kanpur Dehat",
            "Kanpur Nagar",
            "Kanshiram Nagar (Kasganj)",
            "Kaushambi",
            "Kushinagar (Padrauna)",
            "Lakhimpur - Kheri",
            "Lalitpur",
            "Lucknow",
            "Maharajganj",
            "Mahoba",
            "Mainpuri",
            "Mathura",
            "Mau",
            "Meerut",
            "Mirzapur",
            "Moradabad",
            "Muzaffarnagar",
            "Pilibhit",
            "Pratapgarh",
            "RaeBareli",
            "Rampur",
            "Saharanpur",
            "Sambhal (Bhim Nagar)",
            "Sant Kabir Nagar",
            "Shahjahanpur",
            "Shamali (Prabuddh Nagar)",
            "Shravasti",
            "Siddharth Nagar",
            "Sitapur",
            "Sonbhadra",
            "Sultanpur",
            "Unnao",
            "Varanasi"
        ],
        "CG": [
            "Balod",
            "Baloda Bazar",
            "Balrampur",
            "Bastar",
            "Bemetara",
            "Bijapur",
            "Bilaspur",
            "Dantewada (South Bastar)",
            "Dhamtari",
            "Durg",
            "Gariyaband",
            "Janjgir-Champa",
            "Jashpur",
            "Kabirdham (Kawardha)",
            "Kanker (North Bastar)",
            "Kondagaon",
            "Korba",
            "Korea (Koriya)",
            "Mahasamund",
            "Mungeli",
            "Narayanpur",
            "Raigarh",
            "Raipur",
            "Rajnandgaon",
            "Sukma",
            "Surajpur",
            "Surguja"
        ],
        "AP": [
            "Anantapur",
            "Chittoor",
            "East Godavari",
            "Guntur",
            "Krishna",
            "Kurnool",
            "Prakasam",
            "Srikakulam",
            "Sri Potti Sriramulu Nellore",
            "Visakhapatnam",
            "Vizianagaram",
            "West Godavari",
            "YSR District, Kadapa (Cuddapah)"
        ],

        "AR": [
            "Anjaw",
            "Changlang",
            "Dibang Valley",
            "East Kameng",
            "East Siang",
            "Kra Daadi",
            "Kurung Kumey",
            "Lohit",
            "Longding",
            "Lower Dibang Valley",
            "Lower Siang",
            "Lower Subansiri",
            "Namsai",
            "Papum Pare",
            "Siang",
            "Tawang",
            "Tirap",
            "Upper Siang",
            "Upper Subansiri",
            "West Kameng",
            "West Siang"
        ],

        "AS": [
            "Baksa",
            "Barpeta",
            "Biswanath",
            "Bongaigaon",
            "Cachar",
            "Charaideo",
            "Chirang",
            "Darrang",
            "Dhemaji",
            "Dhubri",
            "Dibrugarh",
            "Dima Hasao (North Cachar Hills)",
            "Goalpara",
            "Golaghat",
            "Hailakandi",
            "Hojai",
            "Jorhat",
            "Kamrup",
            "Kamrup Metropolitan",
            "Karbi Anglong",
            "Karimganj",
            "Kokrajhar",
            "Lakhimpur",
            "Majuli",
            "Morigaon",
            "Nagaon",
            "Nalbari",
            "Sivasagar",
            "Sonitpur",
            "South Salamara-Mankachar",
            "Tinsukia",
            "Udalguri",
            "West Karbi Anglong"
        ],

        "BR": [
            "Araria",
            "Arwal",
            "Aurangabad",
            "Banka",
            "Begusarai",
            "Bhagalpur",
            "Bhojpur",
            "Buxar",
            "Darbhanga",
            "East Champaran (Motihari)",
            "Gaya",
            "Gopalganj",
            "Jamui",
            "Jehanabad",
            "Kaimur (Bhabua)",
            "Katihar",
            "Khagaria",
            "Kishanganj",
            "Lakhisarai",
            "Madhepura",
            "Madhubani",
            "Munger (Monghyr)",
            "Muzaffarpur",
            "Nalanda",
            "Nawada",
            "Patna",
            "Purnia (Purnea)",
            "Rohtas",
            "Saharsa",
            "Samastipur",
            "Saran",
            "Sheikhpura",
            "Sheohar",
            "Sitamarhi",
            "Siwan",
            "Supaul",
            "Vaishali",
            "West Champaran"
        ],

        "Chandigrh": [
            "Chandigarh"
        ],

        "DN": [
            "Dadra & Nagar Haveli"
        ],

        "DD": [
            "Daman",
            "Diu"
        ],

        "DL": [
            "Central Delhi",
            "East Delhi",
            "New Delhi",
            "North Delhi",
            "North East  Delhi",
            "North West  Delhi",
            "Shahdara",
            "South Delhi",
            "South East Delhi",
            "South West  Delhi",
            "West Delhi"
        ],

        "GA": [
            "North Goa",
            "South Goa"
        ],

        "GJ": [
            "Ahmedabad",
            "Amreli",
            "Anand",
            "Aravalli",
            "Banaskantha (Palanpur)",
            "Bharuch",
            "Bhavnagar",
            "Botad",
            "Chhota Udepur",
            "Dahod",
            "Dangs (Ahwa)",
            "Devbhoomi Dwarka",
            "Gandhinagar",
            "Gir Somnath",
            "Jamnagar",
            "Junagadh",
            "Kachchh",
            "Kheda (Nadiad)",
            "Mahisagar",
            "Mehsana",
            "Morbi",
            "Narmada (Rajpipla)",
            "Navsari",
            "Panchmahal (Godhra)",
            "Patan",
            "Porbandar",
            "Rajkot",
            "Sabarkantha (Himmatnagar)",
            "Surat",
            "Surendranagar",
            "Tapi (Vyara)",
            "Vadodara",
            "Valsad"
        ],

        "HR": [
            "Ambala",
            "Bhiwani",
            "Charkhi Dadri",
            "Faridabad",
            "Fatehabad",
            "Gurugram (Gurgaon)",
            "Hisar",
            "Jhajjar",
            "Jind",
            "Kaithal",
            "Karnal",
            "Kurukshetra",
            "Mahendragarh",
            "Nuh",
            "Palwal",
            "Panchkula",
            "Panipat",
            "Rewari",
            "Rohtak",
            "Sirsa",
            "Sonipat",
            "Yamunanagar"
        ],

        "HP": [
            "Bilaspur",
            "Chamba",
            "Hamirpur",
            "Kangra",
            "Kinnaur",
            "Kullu",
            "Lahaul & Spiti",
            "Mandi",
            "Shimla",
            "Sirmaur (Sirmour)",
            "Solan",
            "Una"
        ],

        "JK": [
            "Anantnag",
            "Bandipore",
            "Baramulla",
            "Budgam",
            "Doda",
            "Ganderbal",
            "Jammu",
            "Kargil",
            "Kathua",
            "Kishtwar",
            "Kulgam",
            "Kupwara",
            "Leh",
            "Poonch",
            "Pulwama",
            "Rajouri",
            "Ramban",
            "Reasi",
            "Samba",
            "Shopian",
            "Srinagar",
            "Udhampur"
        ],



        "JH": [
            "Bokaro",
            "Chatra",
            "Deoghar",
            "Dhanbad",
            "Dumka",
            "East Singhbhum",
            "Garhwa",
            "Giridih",
            "Godda",
            "Gumla",
            "Hazaribag",
            "Jamtara",
            "Khunti",
            "Koderma",
            "Latehar",
            "Lohardaga",
            "Pakur",
            "Palamu",
            "Ramgarh",
            "Ranchi",
            "Sahibganj",
            "Seraikela-Kharsawan",
            "Simdega",
            "West Singhbhum"
        ],

        "KA": [
            "Bagalkot",
            "Ballari (Bellary)",
            "Belagavi (Belgaum)",
            "Bengaluru (Bangalore) Rural",
            "Bengaluru (Bangalore) Urban",
            "Bidar",
            "Chamarajanagar",
            "Chikballapur",
            "Chikkamagaluru (Chikmagalur)",
            "Chitradurga",
            "Dakshina Kannada",
            "Davangere",
            "Dharwad",
            "Gadag",
            "Hassan",
            "Haveri",
            "Kalaburagi (Gulbarga)",
            "Kodagu",
            "Kolar",
            "Koppal",
            "Mandya",
            "Mysuru (Mysore)",
            "Raichur",
            "Ramanagara",
            "Shivamogga (Shimoga)",
            "Tumakuru (Tumkur)",
            "Udupi",
            "Uttara Kannada (Karwar)",
            "Vijayapura (Bijapur)",
            "Yadgir"
        ],

        "KL": [
            "Alappuzha",
            "Ernakulam",
            "Idukki",
            "Kannur",
            "Kasaragod",
            "Kollam",
            "Kottayam",
            "Kozhikode",
            "Malappuram",
            "Palakkad",
            "Pathanamthitta",
            "Thiruvananthapuram",
            "Thrissur",
            "Wayanad"
        ],

        "MH": [
            "Ahmednagar",
            "Akola",
            "Amravati",
            "Aurangabad",
            "Beed",
            "Bhandara",
            "Buldhana",
            "Chandrapur",
            "Dhule",
            "Gadchiroli",
            "Gondia",
            "Hingoli",
            "Jalgaon",
            "Jalna",
            "Kolhapur",
            "Latur",
            "Mumbai City",
            "Mumbai Suburban",
            "Nagpur",
            "Nanded",
            "Nandurbar",
            "Nashik",
            "Osmanabad",
            "Palghar",
            "Parbhani",
            "Pune",
            "Raigad",
            "Ratnagiri",
            "Sangli",
            "Satara",
            "Sindhudurg",
            "Solapur",
            "Thane",
            "Wardha",
            "Washim",
            "Yavatmal"
        ],

        "MN": [
            "Bishnupur",
            "Chandel",
            "Churachandpur",
            "Imphal East",
            "Imphal West",
            "Jiribam",
            "Kakching",
            "Kamjong",
            "Kangpokpi",
            "Noney",
            "Pherzawl",
            "Senapati",
            "Tamenglong",
            "Tengnoupal",
            "Thoubal",
            "Ukhrul"
        ],
        "ML": [
            "East Garo Hills",
            "East Jaintia Hills",
            "East Khasi Hills",
            "North Garo Hills",
            "Ri Bhoi",
            "South Garo Hills",
            "South West Garo Hills ",
            "South West Khasi Hills",
            "West Garo Hills",
            "West Jaintia Hills",
            "West Khasi Hills"
        ],
        "MZ": [
            "Aizawl",
            "Champhai",
            "Kolasib",
            "Lawngtlai",
            "Lunglei",
            "Mamit",
            "Saiha",
            "Serchhip"
        ],
        "NL": [
            "Dimapur",
            "Kiphire",
            "Kohima",
            "Longleng",
            "Mokokchung",
            "Mon",
            "Peren",
            "Phek",
            "Tuensang",
            "Wokha",
            "Zunheboto"
        ],

        "OR": [
            "Angul",
            "Balangir",
            "Balasore",
            "Bargarh",
            "Bhadrak",
            "Boudh",
            "Cuttack",
            "Deogarh",
            "Dhenkanal",
            "Gajapati",
            "Ganjam",
            "Jagatsinghapur",
            "Jajpur",
            "Jharsuguda",
            "Kalahandi",
            "Kandhamal",
            "Kendrapara",
            "Kendujhar (Keonjhar)",
            "Khordha",
            "Koraput",
            "Malkangiri",
            "Mayurbhanj",
            "Nabarangpur",
            "Nayagarh",
            "Nuapada",
            "Puri",
            "Rayagada",
            "Sambalpur",
            "Sonepur",
            "Sundargarh"
        ],

        "PB": [
            "Amritsar",
            "Barnala",
            "Bathinda",
            "Faridkot",
            "Fatehgarh Sahib",
            "Fazilka",
            "Ferozepur",
            "Gurdaspur",
            "Hoshiarpur",
            "Jalandhar",
            "Kapurthala",
            "Ludhiana",
            "Mansa",
            "Moga",
            "Muktsar",
            "Nawanshahr (Shahid Bhagat Singh Nagar)",
            "Pathankot",
            "Patiala",
            "Rupnagar",
            "Sahibzada Ajit Singh Nagar (Mohali)",
            "Sangrur",
            "Tarn Taran"
        ],
        "PY": [
            "Karaikal",
            "Mahe",
            "Pondicherry",
            "Yanam"
        ],
        "RJ": [
            "Rajasthan"
        ],
        "SK": [
            "East Sikkim",
            "North Sikkim",
            "South Sikkim",
            "West Sikkim"
        ],
        "TN": [
            "Ariyalur",
            "Chennai",
            "Coimbatore",
            "Cuddalore",
            "Dharmapuri",
            "Dindigul",
            "Erode",
            "Kanchipuram",
            "Kanyakumari",
            "Karur",
            "Krishnagiri",
            "Madurai",
            "Nagapattinam",
            "Namakkal",
            "Nilgiris",
            "Perambalur",
            "Pudukkottai",
            "Ramanathapuram",
            "Salem",
            "Sivaganga",
            "Thanjavur",
            "Theni",
            "Thoothukudi (Tuticorin)",
            "Tiruchirappalli",
            "Tirunelveli",
            "Tiruppur",
            "Tiruvallur",
            "Tiruvannamalai",
            "Tiruvarur",
            "Vellore",
            "Viluppuram",
            "Virudhunagar"
        ],
        "TR": [
            "Dhalai",
            "Gomati",
            "Khowai",
            "North Tripura",
            "Sepahijala",
            "South Tripura",
            "Unakoti",
            "West Tripura"
        ],
        "UK": [
            "Almora",
            "Bageshwar",
            "Chamoli",
            "Champawat",
            "Dehradun",
            "Haridwar",
            "Nainital",
            "Pauri Garhwal",
            "Pithoragarh",
            "Rudraprayag",
            "Tehri Garhwal",
            "Udham Singh Nagar",
            "Uttarkashi"
        ],
        "WB": [
            "Alipurduar",
            "Bankura",
            "Birbhum",
            "Burdwan (Bardhaman)",
            "Cooch Behar",
            "Dakshin Dinajpur (South Dinajpur)",
            "Darjeeling",
            "Hooghly",
            "Howrah",
            "Jalpaiguri",
            "Kalimpong",
            "Kolkata",
            "Malda",
            "Murshidabad",
            "Nadia",
            "North 24 Parganas",
            "Paschim Medinipur (West Medinipur)",
            "Purba Medinipur (East Medinipur)",
            "Purulia",
            "South 24 Parganas",
            "Uttar Dinajpur (North Dinajpur)"
        ]


    };
    $scope.countries = {
        MP: ["MADHYAPRADESH"],
        UP: ["UTTARPRADESH"],
        CG: ["CHATTISGARH"],
        AP: ["Andhra Pradesh"],
        AR: ["Arunachal Pradesh"],
        AS: ["Assam"],
        BR: ["Bihar"],
        Chandigrh: ["Chandigarh"],
        DN: ["Dadra and Nagar Haveli"],
        DD: ["Daman and Diu"],
        DL: ["Delhi"],
        GA: ["Goa"],
        GJ: ["Gujarat"],
        HR: ["Haryana"],
        HP: ["Himachal Pradesh"],
        JK: ["Jammu and Kashmir"],
        JH: ["Jharkhand"],
        KA: ["Karnataka"],
        KL: ["Keral"],
        MH: ["Maharashtra"],
        MN: ["Manipur"],
        ML: ["Meghalaya"],
        MZ: ["Mizoram"],
        NL: ["Nagaland"],
        OR: ["Orissa"],
        PB: ["Punjab"],
        PY: ["Pondicherry"],
        RJ: ["Rajasthan"],
        SK: ["Sikkim"],
        TN: ["Tamil Nadu"],
        TR: ["Tripura"],
        UK: ["Uttarakhand"],
        WB: ["West Bengal"]
    }


})