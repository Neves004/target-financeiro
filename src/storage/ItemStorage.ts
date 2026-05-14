// import AsyncStorage from '@react-native-async-storage/async-storage';

// const STORAGE_KEY = '@goals';

// export async function getGoals() {
//     const data = await AsyncStorage.getItem(STORAGE_KEY);
//     return data ? JSON.parse(data) : [];
// }

// async function saveGoals(goals) {
//     await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
// }

// export async function addGoal(goal) {
//     const goals = await getGoals();
//     const updated = [...goals, goal];
//     await AsyncStorage.setItem('@goals', JSON.stringify(updated));
// }


// export async function addTransaction(goalId, transaction) {
//     const goals = await getGoals();

//     const updated = goals.map(goal => {
//         if (goal.id === goalId) {
//             const newSaved =
//                 transaction.type === 'in'
//                     ? goal.saved + transaction.value
//                     : goal.saved - transaction.value;

//             return {
//                 ...goal,
//                 saved: newSaved,
//                 transactions: [...goal.transactions, transaction],
//             };
//         }
//         return goal;
//     });

//     await saveGoals(updated);
// }

// export async function updateGoal(updatedGoal) {
//     const goals = await getGoals();

//     const updated = goals.map(goal =>
//         goal.id === updatedGoal.id ? updatedGoal : goal
//     );

//     await AsyncStorage.setItem('@goals', JSON.stringify(updated));
// }

// export async function deleteTransaction(goalId, transactionId) {
//     const goals = await getGoals();

//     const updated = goals.map(goal => {
//         if (goal.id === goalId) {
//             const transaction = goal.transactions.find(t => t.id === transactionId);

//             let newSaved = goal.saved;

//             if (transaction) {
//                 newSaved =
//                     transaction.type === 'in'
//                         ? goal.saved - transaction.value
//                         : goal.saved + transaction.value;
//             }

//             return {
//                 ...goal,
//                 saved: newSaved,
//                 transactions: goal.transactions.filter(t => t.id !== transactionId),
//             };
//         }
//         return goal;
//     });

//     await saveGoals(updated);
// }

// export async function deleteGoal(goalId) {
//     const goals = await getGoals();

//     const updated = goals.filter(goal => goal.id !== goalId);

//     await AsyncStorage.setItem('@goals', JSON.stringify(updated));
// }