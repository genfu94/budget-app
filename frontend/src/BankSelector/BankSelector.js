import React from "react"
import Select from 'react-select'
import Button from '@mui/material/Button';
import NavBar from '../NavBar/navbar.js'

class BankSelector extends React.Component {
    constructor(props) {
        super(props);

        this.countries = [
            { value: 'IT', label: 'Italia' },
            { value: 'US', label: 'United States' }
        ]

        this.state = {
            institutions: [],
            selected_institution: null
        }
    }
    

    onCountrySelect(selected_country) {
        fetch(`http://localhost:8000/${selected_country.value}`)
            .then((res) => res.json())
            .then((data) => {
                data.forEach((institution) => {this.state.institutions.push({'value': institution['id'], 'label': institution['name']})})
            });
    }

    bankConnect() {
        let institution_id = this.state.selected_institution.value;
        console.log("Institution selected", institution_id);
        fetch(`http://localhost:8000/bank_connect/${institution_id}`)
            .then((res) => res.json())
            .then((data) => {
                let bank_connection_link = data.link;
                let requisition_id = data.requisition_id;

                window.location.replace(bank_connection_link);
            });
    }

    render() {
        return (
            <div style={{'background-color': '#eff0f2'}}>
                <NavBar/>
                <Select options={this.countries} onChange={this.onCountrySelect.bind(this)}/>
                <Select options={this.state.institutions} onChange={(selected_institution) => {this.setState({selected_institution: selected_institution})}}/>
                <Button variant='outlined' onClick={this.bankConnect.bind(this)}>Connect</Button>
            </div>
        );
    }
}

export default BankSelector;