import Vue from 'vue';
import VueMq from 'vue-mq';

Vue.use(VueMq, {
	breakpoints: {
		sm: 690,
		md: 1250,
		lg: Infinity,
	}
});
