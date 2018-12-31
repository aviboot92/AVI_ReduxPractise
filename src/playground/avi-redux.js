import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// Demo State
const demoState = {
    expenses: [{
        id: 'sfjkjfjsdjk',
        descreption: 'January Month',
        note: 'This is the final payment',
        amount: 5000,
        createdAt: 0

    }],
    filters: {
        text: "",
        sortBy: "date",
        startDate: undefined,
        endDate: undefined 
    }
} 
// ========Expenses Action Generators===============
// ADD_EXPENSE
const addExpense = ({
    description = "",
    note = "",
    amount = 0,
    createdAt = 0
} = {}) =>({
    type: 'ADD_EXPENSE',
    expense:{
        id : uuid(),
        description,
        note,
        amount,
        createdAt
    }
});
// REMOVE_EXPENSE
const removeExpense = ({id = ''} ={}) =>({
    type:'REMOVE_EXPENSE',
    id
}); 
// EDIT_EXPENSE
const editExpense = (id, edits ) =>({
    type:'EDIT_EXPENSE',
    edits,
    id
});

// Default State
const expensesDefaultState = [];
const filtersDefaultState = {
    text: "",
    sortBy: "date",
    startDate: undefined,
    endDate: undefined 
}

// Expenses Reducer
const expensesReducer = (state = expensesDefaultState, action) => {
    switch(action.type){
        case 'ADD_EXPENSE':{
            // console.log("I am in ADD_EXPENSE");
            return [...state, action.expense];
        };
        case 'REMOVE_EXPENSE':{
            // console.log("I am in REMOVE_EXPENSE");
            return state.filter((expense) => {
                if(expense.id !== action.id){
                    return expense
                }
            });
        }
        case 'EDIT_EXPENSE':{
            return state.map((expense)=> {
                if(expense.id === action.id){
                    return{
                        ...expense,
                        ...action.edits
                    }
                } else {
                    return expense
                }
            });
        };
        default: return state;
    };
};

// ==============Filters Action Generators============
// Set Text Filter
const setTextFilter = (par) =>({
    type:"SET_TEXT_FILTER",
    par
});
// Sort by Amount
const sortByAmount = () =>({
    type:"SORT_BY_AMOUNT"
});
// Sort By Date
const sortByDate = () =>({
    type:"SORT_BY_DATE"
});
// Set Start Date
const setStartDate = (par) =>({
    type:"SET_START_DATE",
    par
});
// Set End Date
const setEndDate = (par) => ({
    type:"SET_END_DATE",
    par
})


// Filters Reducer
const filtersReducer = (state = filtersDefaultState, action) => {
    switch (action.type){
        case 'SET_TEXT_FILTER':{
            if(action.par === undefined){
                const emptyStr = "";
                return{
                    ...state,
                    text: emptyStr
                };
            } else {
                return{
                    ...state,
                    text: action.par
                }
            };
        };
        case "SORT_BY_AMOUNT":
            return {
                ...state,
                sortBy: "amount"

            }
        case "SORT_BY_DATE":
            return {
                ...state,
                sortBy: "date"
        };
        case "SET_START_DATE":{
            if(action.par === undefined){
                return{
                    ...state,
                    startDate: undefined
                };
            } else {
                return{
                    ...state,
                    startDate: action.par
                }
            };
        };
        case "SET_END_DATE": {
            if(action.par === undefined){
                return{
                    ...state,
                    endDate: undefined
                };
            } else{
                return{
                    ...state,
                    endDate: action.par
                };
            };
        };
        default: return state;
    }
}

// Store Craetion 
const store = createStore(combineReducers({
    expenses : expensesReducer,
    filters: filtersReducer
})); 

// Store SUBSCRIBE
store.subscribe(() => {console.log(store.getState())});

const expenseOne = store.dispatch(addExpense({description: 'club', note:'high life', amount:2000}));
const expenseTwo = store.dispatch(addExpense({description:"condoms", note: "Don't fuck too much", amount:500}));
const expenseThree = store.dispatch(addExpense({description:"weed", note: "Smoke weed everyday", amount:300}));
const expenseFour = store.dispatch(addExpense({description:"flat", note: "Keep it clean", amount:400}));

store.dispatch(removeExpense({id:expenseOne.expense.id}));

store.dispatch(editExpense(expenseThree.expense.id, {note:"It is expensive in this country"}));

store.dispatch(setTextFilter("weed"));
store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
store.dispatch(sortByDate());

store.dispatch(setStartDate(125));
store.dispatch(setStartDate());
store.dispatch(setEndDate(1250));
store.dispatch(setEndDate());




