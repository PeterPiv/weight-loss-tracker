import { useState } from "react";
import "./style.css";

export default function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(null);
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [weightGoal, setWeightGoal] = useState(null);

  // checking if the form is submitted
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  function handleInputChange(e) {
    const { name, value } = e.target;

    const sanitizedValue = value === "" ? null : value;

    switch (name) {
      case "name":
        setName(sanitizedValue);
        break;
      case "age":
        setAge(sanitizedValue);
        break;
      case "height":
        setHeight(sanitizedValue);
        break;
      case "weight":
        setWeight(sanitizedValue);
        break;
      case "weightGoal":
        setWeightGoal(sanitizedValue);
        break;
      default:
        break;
    }
  }

  function calculateBMI() {
    if (height && weight) {
      const heightInMeters = height / 100;
      return (weight / heightInMeters ** 2).toFixed(2);
    }
    return null;
  }

  function handleSubmit(e) {
    console.log(e);
    console.log("handleSubmit function");
    setIsFormSubmitted(true);
    console.log(isFormSubmitted);
    e.preventDefault();
  }

  return (
    <>
      {!isFormSubmitted ? (
        <div className="container">
          <Logo />
          <Login name={name} age={age} height={height} weight={weight} weightGoal={weightGoal} onChange={handleInputChange} handleSubmit={handleSubmit} />
        </div>
      ) : (
        <ProfileDisplay name={name} weight={weight} weightGoal={weightGoal} height={height} />
      )}
    </>
  );
}

function Logo() {
  return (
    <div className="logo">
      <img src="./pics/logo.png" alt="App logo" />
      <p>The only time you want to see the line go down</p>
    </div>
  );
}

function Login({ name, age, height, weight, onChange, weightGoal, handleSubmit }) {
  return (
    <div>
      <form action="#" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Your name</label>
          <input type="text" name="name" id="name" value={name} onChange={onChange} />
        </div>
        <div>
          <label htmlFor="age">Your age</label>
          <input type="number" name="age" id="age" min="0" max="150" value={age || ""} onChange={onChange} />
        </div>
        <div>
          <label htmlFor="height">Height (in CM)</label>
          <input type="number" name="height" id="height" min="1" max="300" value={height || ""} onChange={onChange} />
        </div>
        <div>
          <label htmlFor="weight">Weight (in KG)</label>
          <input type="number" name="weight" id="weight" min="1" max="500" value={weight || ""} onChange={onChange} />
        </div>
        <div>
          <label htmlFor="weightGoal">Weight goal (in KG)</label>
          <input type="number" name="weightGoal" id="weightGoal" min="1" max="500" value={weightGoal || ""} onChange={onChange} />
        </div>
        <Button handleSubmit={handleSubmit}>Create profile</Button>
      </form>
    </div>
  );
}

function Button({ children, handleSubmit }) {
  return (
    <button type="button" onClick={handleSubmit}>
      {children}
    </button>
  );
}

function ProfileDisplay({ name, BMI, weight, weightGoal, height }) {
  return (
    <>
      <div className="logo">
        <img src="./pics/logo.png" alt="App logo" />
      </div>
      <WelcomeSign name={name}></WelcomeSign>
      <WeightSection weight={weight} weightGoal={weightGoal}></WeightSection>
      <BMISection weight={weight} height={height}></BMISection>
      <TodaysTip></TodaysTip>
    </>
  );
}

function WelcomeSign({ name }) {
  return (
    <h1 className="welcome">
      Welcome{" "}
      <span>
        <strong>{name}</strong>
      </span>
    </h1>
  );
}

function WeightSection({ weight, weightGoal }) {
  const weightDifferece = weight - weightGoal;

  return (
    <>
      <div className="weight-section">
        <div>
          Your current weight
          <div>
            is <strong>{weight}KG</strong>
          </div>
        </div>
        <div>
          Your current goal
          <div>
            is <strong>{weightGoal}KG</strong>
          </div>
        </div>
        <div>
          You still need to lose:
          <div>
            is <strong>{weightDifferece}KG</strong>
          </div>
        </div>
      </div>
    </>
  );
}

function BMISection({ weight, height }) {
  const heightInMeters = height / 100;
  const BMI = (weight / heightInMeters ** 2).toFixed(1);

  return (
    <div className="bmi-section">
      <div>
        <strong>BMI</strong> should be between <span>18.5 - 24.9</span>
      </div>
      <div>
        Your current <strong>BMI</strong>: {BMI}
      </div>
    </div>
  );
}

function TodaysTip() {
  const tips = [
    "Focus on a well-balanced diet with fruits, vegetables, lean proteins, and whole grains.",
    "Be mindful of portion sizes to avoid overeating. Use smaller plates.",
    "Drink plenty of water throughout the day to stay hydrated.",
    "Eat regular meals and snacks to keep your metabolism steady.",
    "Limit processed foods and be aware of hidden sugars, unhealthy fats, and additives.",
    "Practice mindful eating, avoiding distractions like TV or smartphones.",
    "Include high-fiber foods in your diet for a feeling of fullness.",
    "Opt for healthier cooking methods such as grilling, baking, or steaming.",
    "Incorporate a mix of aerobic exercises and strength training into your routine.",
    "Ensure you get enough quality sleep to regulate hunger-related hormones.",
    "Cut down on sugary drinks and choose water, herbal teas, or infused water.",
    "Maintain a food diary to track eating habits and identify triggers.",
    "Choose healthy snacks like fresh fruits, nuts, or yogurt.",
    "Plan meals and snacks in advance to avoid impulsive and unhealthy choices.",
    "Be patient and stay consistent with healthy eating and exercise habits.",
    "Share your weight loss goals with friends or family for support.",
    "Focus on positive changes in your lifestyle rather than just the number on the scale.",
    "Celebrate small victories along the way to stay motivated.",
    "Consult with a nutritionist or healthcare professional for personalized advice.",
  ];
  // how about filtering the tips array, and based on
  const randomIndex = Math.floor(Math.random() * tips.length);

  return (
    <div className="todays-tip">
      <p>Here&apos;s a tip for you:</p>
      <div>
        <strong>{tips[randomIndex]}</strong>
      </div>
    </div>
  );
}
