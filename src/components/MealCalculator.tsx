import React, { useState } from 'react'
import styled from 'styled-components';
import { ComparisonPriceUnitsEnum, UnitsEnum } from '../utils/enums/enums';
import Input from './Input';
import Dropdown from './Dropdown';
import Button from './Button';
import { Meal } from '../utils/types';

const MealCalculator = () => {
  // const [activeTab, setActiveTab] = useState<TabsEnum>(TabsEnum.MEAL_CALCULATOR);

  const [foodItemName, setFoodItemName] = useState<string>('');

  const [amount, setAmount] = useState<string>('');
  const [amountUnit, setAmountUnit] = useState(UnitsEnum.GRAMS);
  
  const [comparisonPrice, setComparisonPrice] = useState('');
  const [comparisonPriceUnit, setComparisonPriceUnit] = useState<ComparisonPriceUnitsEnum | undefined>(undefined);

  const [meal, setMeal] = useState<Meal>({ foodItems: [], totalCost: 0 });

  // const getTabBar = () => (
  //   <TabBarContainer>
  //     <Tab isActive={activeTab === TabsEnum.MEAL_CALCULATOR} onClick={() => setActiveTab(TabsEnum.MEAL_CALCULATOR)}>
  //       <h6>Måltidskalkylatorn</h6>
  //     </Tab>
  //     <Tab isActive={activeTab === TabsEnum.PROTEIN_PER_SEK} onClick={() => setActiveTab(TabsEnum.PROTEIN_PER_SEK)}>
  //       <h6>Protein per krona</h6>
  //     </Tab>
  //   </TabBarContainer>
  // );

  const getNumberFromString = (string: string) => {
    const number = Number(string.replace(',', '.'));
    return isNaN(number) ? 0 : number;
  }

  const getDefaultComaparisonUnit = () => {
    switch (amountUnit) {
      case UnitsEnum.GRAMS:
        return ComparisonPriceUnitsEnum.KILOGRAMS;
      case UnitsEnum.UNIT:
        return ComparisonPriceUnitsEnum.UNIT;
      case UnitsEnum.KILOGRAMS:
        return ComparisonPriceUnitsEnum.KILOGRAMS;
      case UnitsEnum.LITERS:
        return ComparisonPriceUnitsEnum.LITERS;
      case UnitsEnum.DECILITERS:
        return ComparisonPriceUnitsEnum.LITERS;
      case UnitsEnum.MILLILITERS:
        return ComparisonPriceUnitsEnum.LITERS;
      default:
        return ComparisonPriceUnitsEnum.KILOGRAMS;
    }
  };

  const getNewFoodItemObject = () => {
    return {
      name: foodItemName,
      cost: calculateFoodCost(),
      amount: {
        amount: getNumberFromString(amount),
        unit: amountUnit
      }
    };
  };

  const calculateFoodCost = () => {
    if (amountUnit === UnitsEnum.GRAMS) {
      const amountInKilograms = getNumberFromString(amount) / 1000;
      const foodItemCost = amountInKilograms * getNumberFromString(comparisonPrice);
      return Math.round(foodItemCost * 10) / 10;
    }
    if (amountUnit === UnitsEnum.UNIT || amountUnit === UnitsEnum.KILOGRAMS || amountUnit === UnitsEnum.LITERS) {
      const foodItemCost = getNumberFromString(amount) * getNumberFromString(comparisonPrice);
      return Math.round(foodItemCost * 10) / 10;
    }
    if (amountUnit === UnitsEnum.DECILITERS) {
      const amountInLiters = getNumberFromString(amount) / 10;
      const foodItemCost = amountInLiters * getNumberFromString(comparisonPrice);
      return Math.round(foodItemCost * 10) / 10;
    }
    if (amountUnit === UnitsEnum.MILLILITERS) {
      const amountInLiters = getNumberFromString(amount) / 1000;
      const foodItemCost = amountInLiters * getNumberFromString(comparisonPrice);
      return Math.round(foodItemCost * 10) / 10;
    }
    return 0;
  };

  const addFoodItemToMeal = () => {
    const newFoodItem = getNewFoodItemObject();
    setMeal((oldstate) => {
      const updatedFoodItems = [...oldstate.foodItems, newFoodItem];
      const totalCost = (oldstate.totalCost + newFoodItem.cost).toFixed(1);
      return {
        foodItems: updatedFoodItems,
        totalCost: Number(totalCost)
      };
    });
  
    setFoodItemName('');
    setAmount('');
    setComparisonPrice('');
  };

  const handleSetAmountUnit = (unit: UnitsEnum) => {
    setAmountUnit(unit);
  }

  const handleSetComparisonPriceUnit = (unit: ComparisonPriceUnitsEnum) => {
    setComparisonPriceUnit(unit);
  }

  return (
    <RootContainer>
      {/* {getTabBar()} */}
      <h1>Måltidskalkylatorn</h1>
      <Input label="Livsmedel" placeholder="t.ex. Potatis" value={foodItemName} onChange={({ currentTarget }) => setFoodItemName(currentTarget.value)} fullWidth />
      <FiftiFiftyInputContainer>
        <Input label="Mängd" placeholder="t.ex. 250" value={amount} onChange={({ currentTarget }) => setAmount(currentTarget.value)} />
        <Dropdown 
          onOptionClick={(unit: UnitsEnum) => handleSetAmountUnit(unit)}
          // onChange={() => handleSetAmountUnit()} 
          value={amountUnit} 
          options={[ UnitsEnum.GRAMS, UnitsEnum.UNIT, UnitsEnum.KILOGRAMS, UnitsEnum.LITERS, UnitsEnum.DECILITERS, UnitsEnum.MILLILITERS ]}
        />
      </FiftiFiftyInputContainer>
      <FiftiFiftyInputContainer>
        <Input label="Jämförspris" placeholder="t.ex. 14,95" value={comparisonPrice} onChange={({ currentTarget }) => setComparisonPrice(currentTarget.value)} />
        <Dropdown 
          onOptionClick={(unit: ComparisonPriceUnitsEnum) => handleSetComparisonPriceUnit(unit)}
          // onChange={({ currentTarget }) => setComparisonPriceUnit(currentTarget.value)} 
          value={comparisonPriceUnit ?? getDefaultComaparisonUnit()}
          options={[ UnitsEnum.KILOGRAMS, UnitsEnum.UNIT, UnitsEnum.LITERS ]}
        />
      </FiftiFiftyInputContainer>
      <Button 
        onClick={addFoodItemToMeal} 
        disabled={foodItemName === '' || amount === '' || comparisonPrice === ''} 
        fullWidth
      >
        Lägg till i måltid
      </Button>
      <>
        {meal.foodItems.length > 0 && (
          <MealHeader>
            <h2>Måltid</h2>
            <TotalPriceBox>
              <h4>{`${meal.totalCost} kr`}</h4>
            </TotalPriceBox>
          </MealHeader>
        )}
        {meal.foodItems.map((foodItem) => (
          <MealFoodItem>
            <p>{foodItem.name}</p>
            <p>{`${foodItem.cost} kr`}</p>
          </MealFoodItem>
        ))}
      </>
    </RootContainer>
  )
}

const RootContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #F2F6FA;
  padding: 50px 20px 20px 20px;

  > button {
    margin: 24px 0px;
  }
`;

// const TabBarContainer = styled.div`
//   width: 100%;
//   height: fit-content;
//   display: flex;
//   column-gap: 4px;
//   border-bottom: 1px solid #DDE1EA;
//   padding: 8px 0px;
//   margin-bottom: 24px;
// `;

// const Tab = styled.button<{ isActive: boolean }>`
//   border: none;
//   border-radius: 4px;
//   padding: 6px 12px;
//   background-color: ${({ isActive }) => isActive ? '#DDE1EA' : 'transparent'};

//   h6 {
//     color: ${({ isActive }) => isActive ? '#25292D' : '#A0A0A0'};
//   }
// `;

const FiftiFiftyInputContainer = styled.div`
  display: flex;
  column-gap: 8px;
  width: 100%;
  align-items: end;
`;

const MealFoodItem = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between; 
  align-items: center;
  height: 32px;
`;

const MealHeader = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const TotalPriceBox = styled.div`
  background-color: grey;
  padding: 8px;
  border-radius: 4px;
  width: fit-content;
  color: white;
`;

export default MealCalculator;