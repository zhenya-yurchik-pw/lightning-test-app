import {Lightning} from "@lightningjs/sdk";

export default class LogoPage extends Lightning.Component {
    static _template(){
        return {
            LogoPage:{
                x: 800, y: 340,
                src: '../static/images/logo.png'
            }
        }
    }
}
