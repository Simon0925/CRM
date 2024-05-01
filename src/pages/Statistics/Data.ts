import { useCallback, useEffect,useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { fetchData } from "../../store/usersData.slice";
import {fetchExpensesData} from '../../store/expenses.slice'

export function useUserData() {
    const dispatch = useDispatch();

    const fetchUserDataDispatch = useCallback(() => dispatch(fetchData()), [dispatch]);
    const fetchExpensesDataDispatch = useCallback(() => dispatch(fetchExpensesData()), [dispatch]);

    useEffect(() => {
        fetchUserDataDispatch();
        fetchExpensesDataDispatch();
    }, [fetchUserDataDispatch, fetchExpensesDataDispatch]);

    const userData = useSelector((state: RootState) => state.data.data);
    const expenses = useSelector((state: RootState) => state.expenses.expensesData);

    const consideration = useMemo(() => userData.filter(elem => elem.status === 'consideration').length, [userData]);
    const successful = useMemo(() => userData.filter(elem => elem.status === 'successful').length, [userData]);
    const canceled = useMemo(() => userData.filter(elem => elem.status === 'canceled').length, [userData]);
    const trash = useMemo(() => userData.filter(elem => elem.status === 'trash').length, [userData]);
    const allApplications = useMemo(() => userData.length, [userData]);

    const considerationPercent = useMemo(() => +((consideration * 100) / userData.length).toFixed(0), [consideration, userData]);
    const successfulPercent = useMemo(() => +((successful * 100) / userData.length).toFixed(0), [successful, userData]);
    const canceledPercent = useMemo(() => +((canceled * 100) / userData.length).toFixed(0), [canceled, userData]);
    const trashPercent = useMemo(() => +((trash * 100) / userData.length).toFixed(0), [trash, userData]);
    const allApplicationsPercent = useMemo(() => +((allApplications * 100) / userData.length).toFixed(0), [allApplications, userData]);


    const statusData = [
        {
            percent: considerationPercent,
            color: 'rgb(88, 86, 86)'
        },
        {
            percent: successfulPercent,
            color: 'green'
        },
        {
            percent: canceledPercent,
            color: 'rgb(178, 34, 34)'
        },
        {
            percent: trashPercent,
            color: 'rgb(154, 137, 8)'
        },
        {
            percent: allApplicationsPercent,
            color: 'rgb(72, 72, 162)'
        },
    ];

    const statisticData = [
        {
            name: "Consideration",
            color: 'rgb(88, 86, 86)',
            quantity: consideration
        },
        {
            name: "Successful",
            color: 'green',
            quantity: successful
        },
        {
            name: "Canceled",
            color: 'rgb(178, 34, 34)',
            quantity: canceled
        },
        {
            name: "Trash",
            color: 'rgb(154, 137, 8)',
            quantity: trash
        },
        {
            name: "All Applications",
            color: 'rgb(72, 72, 162)',
            quantity: allApplications
        }
    ];

    console.log("userData",userData)


    let curentValue = 0

    userData.map(elem => curentValue += elem.profit)

    
    let fb = 0

    let tikTok = 0

    let other = 0

    expenses.map((elem)=>{
        if (elem.name == "FB"){
            fb += elem.quantity
        }else if (elem.name == "Tik-Tok"){
            tikTok += elem.quantity
        }else if (elem.name == "Other"){
            other += elem.quantity
        }
    })



    const costOfInvestment = (fb +tikTok + other ) 


    const profit = curentValue - (fb +tikTok +other ) 

    const ROI = (profit / costOfInvestment) * 100

    const fbPercent = +((fb * 100) / profit).toFixed(0);
    const tikTokPercent = +((tikTok * 100) / profit).toFixed(0);
    const otherrcent = +((other * 100) / profit).toFixed(0);
    const curentValuePercent = +((profit * 100) / profit).toFixed(0);

    const approve = (100 / (allApplications - consideration - trash) * successful).toFixed(0);

    
    const traficStatics = [
        {
            percent: fbPercent,
            color: '#0175A9'
        },
        {
            percent: tikTokPercent,
            color: '#009A44'
        },
        {
            percent: otherrcent,
            color: '#ED6942'
        },
        {
            percent: curentValuePercent,
            color: '#5F52A1'
        },
    ];

 

    const traficData = [
        {
            name: "FB",
            color: '#0175A9',
            quantity:fb  + " $"
        },
        {
            name: "Tik-Tok",
            color: '#009A44',
            quantity: tikTok + " $"
        },
        {
            name: "Other",
            color: '#ED6942',
            quantity: other + " $"
        },
        {
            name: "All spend",
            color: '#5F52A1',
            quantity: (fb +tikTok +other ) + " $"
        }
    ];

   

    return {
        userData,
        statusData,
        statisticData,
        traficStatics,
        traficData,
        approve,
        ROI,
        fbPercent,
        tikTokPercent,
        otherrcent,
        curentValuePercent,
        profit,
        curentValue

    };
}
