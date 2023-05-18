import React, {Component} from 'react';
import axios from 'axios';

export class Home extends Component {
    state = {
        value: ''
    }

    apiConfig = {
        baseURL: 'https://localhost:44430',
        timeout: 100000,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Pragma: 'no-cache',
        },
    };
    
    api = axios.create(this.apiConfig);
    
    onChange = (value) => {
        this.setState({value: value})
    }

    onSubmit = async () => {
        debugger;

        const {data} = await this.api.post('convert', JSON.stringify({
                value: this.state.value,
            }),
            {
                responseType: 'arraybuffer',
                headers: {
                    'Content-type': 'application/json;',
                },
            })

        let blob = new Blob([data], {type: 'application/pdf;'}),
            downloadUrl = window.URL.createObjectURL(blob),
            filename = "my_pdf";

        let a = document.createElement("a");
        if (typeof a.download === "undefined") {
            window.location.href = downloadUrl;
        } else {
            a.href = downloadUrl;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
        }

    }

    render() {
        return (
            <div>
                <input onChange={(event) => this.onChange(event.target.value)}/>
                <button onClick={this.onSubmit}>Submit</button>
            </div>
        );
    }
}
