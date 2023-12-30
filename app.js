const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(express.static('view'))
app.use('/public', express.static('public'));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/view/index.html');
});

app.listen(port, ()=>{
    console.log("App is running on port 3000")
})


app.post('/BMI', (req,res)=>{
    console.log('Received request body:', req.body);
    var weight = parseFloat(req.body.weight);
    var height = parseFloat(req.body.height);
    var gender = req.body.gender;
    var age = req.body.age;
    var weightUnit = req.body.weightUnit;
    var heightUnit = req.body.heightUnit;

    let heightInMeters = height;
    let weightInKg = weight;

    if (heightUnit === 'cm') {
        heightInMeters = height / 100;
    } 
    else if (heightUnit === 'inches') {
        heightInMeters = height * 0.0254;
    }

    if (weightUnit === 'g') {
        weightInKg = weight / 1000;
    } 
    else if (weightUnit === 'lbs') {
        weightInKg = weight * 0.453592; 
    }

    var bmi = weightInKg / (heightInMeters * heightInMeters);

    let age_factor = 0.1 * age
    let adjusted_bmi = bmi + age_factor

    let gender_factor = 1.0
    if (gender == 'female'){
        gender_factor = 1.1
    }
   
    adjusted_bmi = adjusted_bmi * gender_factor

    var bmiResult = {
        bmi: adjusted_bmi.toFixed(2),
        category: ''
    };


    switch (true) {
        case adjusted_bmi < 18.5:
            bmiResult.category = 'Underweight';
            break;
        case adjusted_bmi >= 18.5 && bmi < 25:
            bmiResult.category = 'Normal weight';
            break;
        case adjusted_bmi >= 25 && bmi < 30:
            bmiResult.category = 'Overweight';
            break;
        default:
            bmiResult.category = 'Obesity';
    }

    res.json(bmiResult);
})
