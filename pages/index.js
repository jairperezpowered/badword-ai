import {Component} from 'react'
import Head from 'next/head'

export default class extends Component {
    state = {
        badWord: [],
        message: 'Powered by Jair Pérez',
        isBadword: false
    }
    constructor(props) {
        super(props)
        this.handleSentence = this.handleSentence.bind(this)
    }
    componentDidMount() {
        let badWord = ['Nojoda', 'Malparido', 'Chirrete', 'Chimba']
        this.setState({badWord})
        setInterval(() => this.setState({message: 'Powered by Jair Pérez'}), 9000)
    }
    handleSentence(e) {
        e.preventDefault()
        let sentence = e.target['sentence'].value
        let filter = sentence.split(' ')
        let {badWord} = this.state

        let isBad = false
        if(!sentence) return this.setState({message: 'Por favor ecribe una oración'})

        filter.forEach(word => {
            
            badWord.forEach(badWord => {
                if(word[0].toUpperCase() + word.slice(1) === badWord) {
                    isBad = true
                    return this.setState({message: `${word[0].toUpperCase() + word.slice(1)} es una mala palabra`})
                }
                e.target['sentence'].value = ''
            })   
        })
        if(!isBad) return this.setState({message: 'Oracion correcta'})
    }
    render() {
        return (
            <div>
                <Head>
                    <title>BadWord AI</title>
                    <meta charSet='utf-8' />
                    <meta name='viewport' content='initial-scale=1.0, width=device-width, maximum-scale=1.0"' />
                    <meta name="theme-color" content="#012869"/>
                    <link rel="icon" sizes="192x192" href="./static/logo.png"/>
                    <meta name="mobile-web-app-capable" content="yes" />
                </Head>
                <main>
                    <div className="title-content">
                        <h1><span>BadWord</span> AI</h1>
                    </div>
                    <div className="message-content">
                        <p>{this.state.message}</p>
                    </div>
                    <div className="form-content">
                        <form onSubmit={this.handleSentence} method="POST">
                            <input name="sentence" placeholder="Escriba una oracion" />
                            <button>Enviar</button>
                        </form>
                    </div>
                    <div className="glosary-content">
                        <h2>Glosario</h2>
                        {this.state.badWord.map((word, i) => <span key={i}>{word}</span>)}
                    </div>
                    <style jsx>{`
                        main {
                            height: 100vh;
                        }
                        .title-content,
                        .message-content,
                        .form-content,
                        .glosary-content {
                            display: flex;
                            justify-content: center;
                            align-items: center
                        }
                        h1,
                        h1 span {
                            font-size: 80px
                        }
                        h1 span {
                            color: #ff5c5c
                        }
                        h2 {
                            font-size: 40px
                        }
                        p {
                            font-size: 40px
                        }
                        span {
                            font-size: 20px;
                            padding: 10px 0
                        }
                        .title-content {
                            height: 20vh;
                        }
                        .message-content {
                            height: 60vh;
                        }
                        .form-content {
                            height: 20vh;
                        }
                        input,
                        button {
                            font-size: 20px;
                            padding: 20px 40px
                        }
                        input {
                            border: 1px solid gray;
                            border-radius: 30px 0 0 30px;
                        }
                        button {
                            border: 2px solid #ff5c5c;
                            border-radius: 0 30px 30px 0;
                            background: #ff5c5c;
                            color: white;
                        }
                        .glosary-content {
                            padding: 20px 0;
                            flex-direction: column
                        }
                        @media (max-width: 760px) {
                            h1, 
                            h1 span {
                                font-size: 40px
                            }
                            p {
                                text-align: center;
                                font-size: 40px
                            }
                            input,
                            button {
                                text-align: center;
                                padding: 10px 0;
                                border-radius: 0;
                                font-size: 20px;
                                width: 100%
                            }
                            form {
                                padding: 0 20px
                            }
                        }
                    `}</style>
                </main>
            </div>
        )
    }   
}