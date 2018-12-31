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
// ======== Action Generators===============
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
            console.log("I am in EDIT_EXPENSE");
            console.log(action);
            state.map((expense) =>{
                if(expense.id === action.id){
                    console.log(action.edits);
                   return {
                       ...expense,
                       ...action.edits
                   }
                }
            });
        }
        default: return state;
    }
};

// Filters Reducer
const filtersReducer = (state = filtersDefaultState, action) => {
    switch (action.type){
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





