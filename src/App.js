import {Lightning, Log, Utils} from '@lightningjs/sdk'
import Splash from "./Splash.js";
import Main from "./Main.js";
import Menu from "./menu/Menu";
import LogoPage from './LogoPage'

export default class App extends Lightning.Component {
    static getFonts() {
        return [{family: 'Regular', url: Utils.asset('fonts/Roboto-Regular.ttf')}]
    }

    static _template() {
        return {
            rect: true, color: 0xff000000, w: 1920, h: 1080,
            Splash: {
                type: Splash, signals: {loaded: true}, alpha: 0
            },
            Main: {
                type: Main, alpha: 0
            },
            Menu: {
                type: Menu, alpha: 0
            },
            LogoPage: {
                type: LogoPage, alpha: 0
            }
        };
    }

    _setup() {
        this._setState("Splash");
    }

    static _states() {
        return [
            class Splash extends this {
                $enter() {
                    this.tag("Splash").setSmooth("alpha", 1);
                }

                $exit() {
                    this.tag("Splash").setSmooth("alpha", 0);
                }

                loaded() {
                    this._setState("LogoPage");
                }
            },
            class Main extends this {
                $enter() {
                    this.tag("Main").patch({
                        smooth: {alpha: 1, y: 0}
                    });
                }

                $exit() {
                    this.tag("Main").patch({
                        smooth: {alpha: 0, y: 100}
                    });
                }

                _getFocused() {
                    return this.tag("Menu");
                }
            },
            class LogoPage extends this {
                $enter() {
                    this.tag("LogoPage").patch({
                        smooth: {alpha: 1, y: 0}
                    });
                }

                $exit() {
                    this.tag("LogoPage").patch({
                        smooth: {alpha: 0, y: 100}
                    });
                }

                _getFocused() {
                    return this.tag("LogoPage");
                }
            }
        ]
    }
}
