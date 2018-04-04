import React,{ Component } from 'react'
import { reduxForm, Field, formValueSelector } from 'redux-form'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { init } from './billingCyclesAction'
import LabelAndInput from '../commom/form/labelAndInput'
import ItemList from './itemList'
import Summary from './summary'

class BillingCycleForm extends Component{

    calculateSummary(){
        const sum = (t, v) => t + v
        return {
            sumOfCredits: this.props.credits.map(c => +c.value || 0).reduce(sum),
            sumOfDebits: this.props.debits.map(d => +d.value || 0).reduce(sum)
        }
    }

    render(){
        const { handleSubmit, readOnly, credits, debits } = this.props        
        const { sumOfCredits, sumOfDebits } = this.calculateSummary()
        return(
            <form role="form" onSubmit={handleSubmit}>
                <div className="box-body">
                    <Field name="name" readOnly={readOnly} component={LabelAndInput} label="Descrição" cols="12 12 12 4" placeholder="Informe uma Descrição"/>
                    <Field name="month" readOnly={readOnly} component={LabelAndInput} type="number" label="Mês" cols="12 12 12 4" placeholder="Informe o Mês"  />
                    <Field name="year" readOnly={readOnly} component={LabelAndInput} type="number" label="Ano" cols="12 12 12 4" placeholder="Informe o Ano" />
                    <Summary credit={sumOfCredits} debit={sumOfDebits} />
                    <ItemList cols="12 12 12 6" list={credits} readOnly={readOnly} field="credits" legend="Créditos" />
                    <ItemList cols="12 12 12 6" list={debits} readOnly={readOnly} field="debits" legend="Débitos" showStatus={true} />
                </div>
                <div className="box-footer">
                    <button type="submit" className={`btn btn-${this.props.submitClass}`}>{this.props.submitLabel}</button>
                    <button type="button" className="btn btn-default" onClick={this.props.init}>Cancel</button>
                </div>
            </form>
        )
    }
}

BillingCycleForm = reduxForm({form: 'billingCycleForm', destroyOnUnmount: false})(BillingCycleForm)
const selector = formValueSelector('billingCycleForm')
const mapStateToProps = state => ({
    credits: selector(state, 'credits'), 
    debits: selector(state, 'debits')
})
const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleForm)