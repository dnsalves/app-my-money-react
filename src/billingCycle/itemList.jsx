import React, { Component } from 'react'
import { Field, arrayInsert, arrayRemove } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../commom/layout/grid'
import Input from '../commom/form/input'
import If from '../commom/operator/if'

class ItemList extends Component{

    add(x, i = {}){        
        if (!this.props.readOnly) {
            this.props.arrayInsert('billingCycleForm', this.props.field, x, i)
        }
    }

    rem(x){        
        if (!this.props.readOnly && this.props.list.length > 1) {
            this.props.arrayRemove('billingCycleForm', this.props.field, x)
        }
    }

    renderRows(){
        const list = this.props.list || []
        return list.map((i, x) => (
            <tr key={x}>
                <td><Field name={`${this.props.field}[${x}].name`} component={Input} placeholder="Informe o nome" readOnly={this.props.readOnly} /></td>
                <td><Field name={`${this.props.field}[${x}].value`} component={Input} placeholder="Informe o valor" readOnly={this.props.readOnly} /></td>
                <If test={this.props.showStatus}>
                    <td><Field name={`${this.props.field}[${x}].status`} component={Input} placeholder="Informe o Status" readOnly={this.props.readOnly} /></td>
                </If>
                <td>
                    <button type="button" className="btn btn-success" onClick={() => this.add(x + 1)}>
                        <i className="fa fa-plus"></i>
                    </button>
                    <button type="button" className="btn btn-warning" onClick={() => this.add(x + 1, i)}>
                        <i className="fa fa-clone"></i>
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => this.rem(x)}>
                        <i className="fa fa-trash-o"></i>
                    </button>
                </td>
            </tr>
        ))
    }

    render() { 
        return(
            <Grid cols={this.props.cols}>
                <fieldset>
                    <legend>{this.props.legend}</legend>
                    <table className="table">
                        <thead>
                            <tr>                                
                                <th>Nome</th>
                                <th>Valor</th>
                                <If test={this.props.showStatus}>
                                    <th>Status</th>
                                </If>
                                <th className="table-actions">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderRows()}
                        </tbody>
                    </table>
                </fieldset>
            </Grid>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({arrayInsert, arrayRemove}, dispatch)
export default connect(null, mapDispatchToProps)(ItemList)