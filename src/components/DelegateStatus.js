module.exports = {
    template: `
        <div class="flex flex-row flex-wrap relative mt-2 text-xs font-semibold" style="height: 2rem; overflow: hidden">
            <div v-for="delegate in delegates" v-tooltip="{content: getTooltip(delegate.status)}" :style="getStyle(delegate.status)" class="flex items-center text-xs font-semibold mt-1">
                <span>{{ delegate.name }}<span v-if="delegate.time_secs !== undefined && delegate.will_forge"> {{Math.floor(delegate.time_secs / 60) }}:{{ (delegate.time_secs % 60).toString().padStart(2, '0') }}</span></span>
                <svg viewBox="0 0 100 100" style="height: 1rem; width: 1rem; margin-left: 0.125rem">
                    <path fill="none" :stroke="getColour(delegate.status)" stroke-width="12" d="M 50 10 A 40 40 0 1 1 49.999 10"></path>
                    <svg height="45" width="45" x="27.5" y="27.5" :viewBox="getViewBox(delegate.status)">
                        <path :fill="getColour(delegate.status)" :d="draw(delegate.status)" />
                        <path v-if="drawSecond(delegate.status)" :fill="getColour(delegate.status)" :d="drawSecond(delegate.status)" />
                    </svg>
                </svg>
            </div>
        </div>
    `,
    data () {
        return {
            draw (status) {
                switch (status) {
                case -1:
                    return "M0,35h100v30H0V35z";
                case 0:
                    return "M11.13043,8.48694L9.04346,7.30432V4.52173c0-0.55652-0.48694-1.04346-1.04346-1.04346 S6.95654,3.96521,6.95654,4.52173v2.78259c0,0.20874,0.06952,0.41742,0.20868,0.6261 c-0.06958,0.34784,0.1391,0.76526,0.48694,0.97394l2.43481,1.3913c0.48694,0.27826,1.11304,0.1391,1.3913-0.41742 C11.82611,9.3913,11.61737,8.7652,11.13043,8.48694z";
                case 1:
                    return "M5.8,16.7c0.3,0.3,0.9,0.3,1.2,0c0,0,0,0,0,0L18.7,4.9c0.3-0.3,0.3-0.9,0-1.2l-2.4-2.5 c-0.3-0.3-0.9-0.3-1.2,0c0,0,0,0,0,0L6.4,10L3.9,7.6C3.6,7.2,3,7.2,2.7,7.6c0,0,0,0,0,0L0.3,10c-0.3,0.3-0.3,0.9,0,1.2L5.8,16.7z";
                case 2:
                    return "M12,17c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1h3c0.6,0,1,0.4,1,1v15c0,0.6-0.4,1-1,1L12,17z M4,17 c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1h3c0.6,0,1,0.4,1,1v15c0,0.6-0.4,1-1,1L4,17z";
                case 3:
                    return "M5.8,8.5L1.3,13c-0.4,0.4-0.4,1.1,0,1.5l2.2,2.2c0.4,0.4,1.1,0.4,1.5,0l4.5-4.5l4.5,4.5 c0.4,0.4,1.1,0.4,1.5,0l2.2-2.2c0.4-0.4,0.4-1.1,0-1.5l-4.5-4.5L17.7,4c0.4-0.4,0.4-1.1,0-1.5l-2.2-2.2c-0.4-0.4-1.1-0.4-1.5,0 L9.5,4.8L5,0.3C4.6-0.1,4-0.1,3.5,0.3L1.3,2.5C0.9,3,0.9,3.6,1.3,4L5.8,8.5z";
                }
                return null;
            },
            drawSecond (status) {
                if (status === 0) {
                    return "M13.94781,2.64349c-0.20868-0.20874-0.41736-0.41742-0.6261-0.6261C11.93042,0.7652,10.05219,0.06958,8.17389,0 H7.82605C5.94781,0.06958,4.06958,0.7652,2.67828,2.0174c-0.20874,0.20868-0.41742,0.41736-0.6261,0.6261 c-1.2522,1.3913-1.94781,3.26953-2.0174,5.14783c0,0.06952,0,0.06952,0,0.06952c0,0.06958,0,0.06958,0,0.06958v0.13916 c0,0.06958,0,0.06958,0,0.06958c0,0.06952,0,0.06952,0,0.06952c0.06958,1.8783,0.7652,3.75653,2.0174,5.14783 c0.20868,0.20874,0.41736,0.41742,0.6261,0.6261C4.06958,15.2348,5.87823,15.93042,7.75653,16h0.06952h0.20874h0.1391h0.06958 c1.87823-0.06958,3.68695-0.7652,5.07825-2.0174c0.20874-0.20868,0.41742-0.41736,0.6261-0.6261 c1.2522-1.3913,1.94781-3.20001,2.0174-5.07825c0-0.06958,0-0.06958,0-0.06958c0-0.06952,0-0.06952,0-0.06952 c0-0.06958,0-0.06958,0-0.06958V7.93042c0-0.06958,0-0.06958,0-0.06958c0-0.06952,0-0.06952,0-0.06952 c0-0.06958,0-0.06958,0-0.06958C15.89563,5.84351,15.20001,4.03479,13.94781,2.64349z M7.96521,13.91302 c-3.26959,0-5.91302-2.64343-5.91302-5.91302s2.64343-5.91302,5.91302-5.91302S13.87823,4.73041,13.87823,8 S11.2348,13.91302,7.96521,13.91302z";
                }
                return null;
            },
            getColour (status) {
                switch (status) {
                case -1:
                    return "rgb(50, 50, 50)";
                case 0:
                    return "rgb(0, 0, 50)";
                case 1:
                    return "rgb(0, 50, 0)";
                case 2:
                    return "rgb(50, 50, 0)";
                case 3:
                    return "rgb(50, 0, 0)";
                }
                return null;
            },
            getPhrase (phrase) {
                return this.phrases[phrase];
            },
            getStyle (status) {
                const css = "border-radius: 0.75rem; height: 1.5rem; padding-left: 0.3rem; padding-right: 0.3rem; margin-right: 0.3rem; ";
                switch (status) {
                case -1:
                    return css + "background-color: rgba(170, 170, 170, 0.5); color: rgb(50, 50, 50)";
                case 0:
                    return css + "background-color: rgba(50, 170, 255, 0.5); color: rgb(0, 0, 50)";
                case 1:
                    return css + "background-color: rgba(170, 255, 170, 0.5); color: rgb(0, 50, 0)";
                case 2:
                    return css + "background-color: rgba(255, 230, 120, 0.5); color: rgb(50, 50, 0)";
                case 3:
                    return css + "background-color: rgba(255, 170, 170, 0.5); color: rgb(50, 0, 0)";
                }
                return null;
            },
            getTooltip (status) {
                switch (status) {
                case -1:
                    return this.getPhrase("INACTIVE");
                case 0:
                    return this.getPhrase("WAITING_TO_FORGE");
                case 1:
                    return this.getPhrase("FORGING");
                case 2:
                    return this.getPhrase("MISSED_ROUND_SINGULAR");
                case 3:
                    return this.getPhrase("NOT_FORGING_SINGULAR");
                }
                return null;
            },
            getViewBox (status) {
                switch (status) {
                case -1:
                    return "0 0 100 100";
                case 0:
                    return "0 0 16 16";
                case 1:
                case 2:
                case 3:
                    return "0 0 19 17";
                }
                return null;
            },
            phrases: {}
        };
    },
    mounted () {
        const profile = walletApi.profiles.getCurrent();
        try {
            this.phrases = require(`../../${profile.language}.json`);
        } catch (error) {
            this.phrases = require("../../en-US.json");
        }
    },
    props: {
        delegates: {
            type: Array
        }
    }
};