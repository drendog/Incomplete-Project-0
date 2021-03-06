import Vue from 'vue';
import Vuex from 'vuex';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import '@mdi/font/css/materialdesignicons.css'; // Ensure you are using css-loader
import VueYouTubeEmbed from 'vue-youtube-embed';
import axios from 'axios';
import VueAxios from 'vue-axios';

import { audioStore } from './SoundSources/audioStore';

Vue.use(Vuex);

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.use(VueYouTubeEmbed);

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

const store = new Vuex.Store({
	modules: {
		audios: audioStore
	},
	state: {
		isPlaying: false,
		globalVolume: 100,
		isVolumeRandom: false,
		isTimerStarted: false,
		timeStart: new Date().getTime(),
		timeDuration: 0,
		isTimeToStop: false
	},
	mutations: {
		removeSoundItem (state, value): void {
			store.commit('audios/removeSoundItem', value);
		},
		togglePlay (state): void {
			state.isPlaying = !state.isPlaying;
		},
		updateGlobalVolume (state, value): void {
			state.globalVolume = value;
		},
		toggleVolumeRandom (state): void {
			state.isVolumeRandom = !state.isVolumeRandom;
		},
		startTimer (state): void {
			state.timeStart = new Date().getTime();
			state.isTimerStarted = true;
			state.isPlaying = state.isTimeToStop;
		},
		stopTimer (state): void {
			state.isTimerStarted = false;
			state.isPlaying = !state.isTimeToStop;
		}
	},
	getters: {
		timeToStop (state) : number {
			return state.timeStart + state.timeDuration;
		}
	}
});

new Vue({
	store,
	mounted () {
		const scScript = document.createElement('script');
		scScript.setAttribute('src', 'https://w.soundcloud.com/player/api.js');
		scScript.async = true;
		scScript.defer = true;
		document.head.appendChild(scScript);
	},
	render: (h) => h(App)
}).$mount('#app');
