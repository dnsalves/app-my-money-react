import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { reset as resetForm, initialize } from 'redux-form'
import Env from '../consts'

import { showTabs, selectTab } from "../commom/tab/tabActions"

const BASE_URL = Env.API_URL
const INITIAL_VALUES = {credits: [{}], debits: [{}]}

export function getList() {
    const request = axios.get(`${BASE_URL}/billingCycles`)
    return {
        type: 'BILLING_CYCLES_FETCHED',
        payload: request
    }
}

export function create(values){
    return submit(values, 'post')
}

export function update(values){
    return submit(values, 'put')
}

export function remove(values){
    return submit(values, 'delete')
}

export function showUpdate(billingCycle){
    return[
        showTabs('tabUpdate'), 
        selectTab('tabUpdate'),
        initialize('billingCycleForm', billingCycle)
    ]
}

export function showDelete(billingCycle){
    return[
        showTabs('tabDelete'), 
        selectTab('tabDelete'),
        initialize('billingCycleForm', billingCycle)
    ]
}

export function init(){
    return[
        showTabs('tabList', 'tabCreate'), 
        selectTab('tabList'),
        getList(),
        initialize('billingCycleForm', INITIAL_VALUES)
    ]
}

function submit(values, method){
    return dispatch => {
        const id = values._id ? values._id : ''
        axios[method](`${BASE_URL}/billingCycles/${id}`, values)
            .then(resp => {
                toastr.success("Sucesso", "operação realizada com sucesso!")
                dispatch(init())
            })
            .catch(e => {
                e.response.data.errors.forEach(error => toastr.error("Erro", error));
            })
    }
}