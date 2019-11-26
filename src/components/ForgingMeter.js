module.exports = {
    template: `
        <svg viewBox="0 0 100 100">
            <path fill="none" stroke="#585c6f" opacity="0.3" stroke-width="10" d="M 50 10 A 40 40 0 1 1 49.999 10"></path>
            <svg v-if="icon" :viewBox="getViewBox" :height="getDimensions" :width="getDimensions" :x="(100 - getDimensions) / 2" :y="(100 - getDimensions) / 2">
                <path :fill="color" :d="getIcon" />
            </svg>
            <path fill="none" stroke-width="12" :d="draw()" :stroke="color"></path>
        </svg>
    `,
    computed: {
        getDimensions () {
            switch (this.icon) {
            case "block":
            case "down":
            case "up":
                return 45;
            default:
                return 35;
            }
        },
        getIcon () {
            switch (this.icon) {
            case "block":
                return "M9.5,16.8c-0.1,0-0.2,0-0.2-0.1c-2.1-1.2-4.3-2.4-6.4-3.6c-0.1,0-0.1-0.1-0.1-0.1 c-0.1-0.1-0.4-0.2-0.5-0.4c-0.1-0.1-0.1-0.2-0.1-0.2c0-0.2,0-0.4,0-0.6l0-7.3c0-0.2,0-0.5,0.5-0.7C4.2,3,9.2,0.2,9.2,0.2 c0.1,0,0.2-0.1,0.2-0.1c0.1,0,0.2,0,0.3,0.1C11.9,1.4,16.6,4,16.6,4C17,4.1,17,4.6,17,4.8c0,1.5,0,7.6,0,7.6c0,0.3-0.1,0.6-0.5,0.7 c-1.4,0.8-6.7,3.7-6.7,3.7C9.7,16.8,9.6,16.8,9.5,16.8L9.5,16.8z M3.6,11.9c1,0.5,2,1.1,3,1.7c0.7,0.4,1.5,0.8,2.2,1.2l0-5.8 C7.7,8.4,6.6,7.7,5.4,7.1c-0.6-0.3-1.2-0.7-1.8-1l0,2C3.6,9.4,3.6,10.6,3.6,11.9z M10.3,14.7c0.7-0.4,1.3-0.7,2-1.1 c1-0.6,2.1-1.2,3.1-1.7c0-1.2,0-2.4,0-3.6c0-0.7,0-1.4,0-2.1L15,6.5c-1.6,0.9-3.1,1.7-4.7,2.6L10.3,14.7z M4.3,4.7 c1,0.5,2,1.1,3,1.6C8,6.8,8.8,7.2,9.7,7.7c1.7-1,3.5-1.9,5.2-2.9c-1-0.5-1.9-1.1-2.9-1.6c-0.8-0.5-1.7-0.9-2.5-1.4 C9.3,1.9,9.2,2,9,2.1C8.9,2.2,8.7,2.3,8.6,2.4L4.3,4.7z";
            case "down":
                return "M10,17.5L3.5,11H7V3h6v8h3.5L10,17.5z";
            case "forging":
                return "M5.8,16.7c0.3,0.3,0.9,0.3,1.2,0c0,0,0,0,0,0L18.7,4.9c0.3-0.3,0.3-0.9,0-1.2l-2.4-2.5 c-0.3-0.3-0.9-0.3-1.2,0c0,0,0,0,0,0L6.4,10L3.9,7.6C3.6,7.2,3,7.2,2.7,7.6c0,0,0,0,0,0L0.3,10c-0.3,0.3-0.3,0.9,0,1.2L5.8,16.7z";
            case "missing":
                return "M12,17c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1h3c0.6,0,1,0.4,1,1v15c0,0.6-0.4,1-1,1L12,17z M4,17 c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1h3c0.6,0,1,0.4,1,1v15c0,0.6-0.4,1-1,1L4,17z";
            case "notForging":
                return "M5.8,8.5L1.3,13c-0.4,0.4-0.4,1.1,0,1.5l2.2,2.2c0.4,0.4,1.1,0.4,1.5,0l4.5-4.5l4.5,4.5 c0.4,0.4,1.1,0.4,1.5,0l2.2-2.2c0.4-0.4,0.4-1.1,0-1.5l-4.5-4.5L17.7,4c0.4-0.4,0.4-1.1,0-1.5l-2.2-2.2c-0.4-0.4-1.1-0.4-1.5,0 L9.5,4.8L5,0.3C4.6-0.1,4-0.1,3.5,0.3L1.3,2.5C0.9,3,0.9,3.6,1.3,4L5.8,8.5z";
            case "timer":
                return "M5.975,13A5.993,5.993,0,0,1,4.332,1.25a.333.333,0,0,0,.2-.25V.5a.472.472,0,0,1,.5-.5H7.02a.472.472,0,0,1,.5.5V1a.254.254,0,0,0,.2.25A6.146,6.146,0,0,1,9.361,2a.312.312,0,0,0,.139.033.169.169,0,0,0,.16-.083l.248-.25a.479.479,0,0,1,.7,0l.7.7a.484.484,0,0,1,0,.7l-.248.25a.237.237,0,0,0-.05.3,5.827,5.827,0,0,1,1,3.3,6.164,6.164,0,0,1-1.8,4.282A5.93,5.93,0,0,1,5.975,13Zm0-10A4,4,0,1,0,9.958,7,4,4,0,0,0,5.975,3Zm.537,5.011H5.505a.475.475,0,0,1-.5-.5v-3a.475.475,0,0,1,.5-.5H6.512a.475.475,0,0,1,.5.5v3A.476.476,0,0,1,6.512,8.011z";
            case "up":
                return "M10,2.5L16.5,9H13v8H7V9H3.5L10,2.5z";
            case "waiting":
                return "M1z";
            }
            return null;
        },
        getViewBox () {
            switch (this.icon) {
            case "timer":
                return "0 0 12 13";
            case "down":
            case "up":
                return "0 0 20 20";
            default:
                return "0 0 19 17";
            }
        }
    },
    data () {
        return {
            getCartesian (radius, angle) {
                const rad = angle * Math.PI / 180;
                return { x: Math.round((50 + radius * Math.cos(rad)) * 1000) / 1000, y: Math.round((50 + radius * Math.sin(rad)) * 1000) / 1000 };
            },
            getCoords (radius, start, end) {
                return { start: this.getCartesian(radius, start), end: this.getCartesian(radius, end) };
            },
            getPath (radius, start, angle) {
                const end = angle - 90;
                const coords = this.getCoords(radius, start, end);
                if (!isNaN(coords.end.x) && !isNaN(coords.end.y)) {
                    return ["M", coords.start.x, coords.start.y, "A", radius, radius, 0, angle <= 180 ? 0 : 1, 1, coords.end.x, coords.end.y].join(" ");
                }
                return null;
            }
        };
    },
    methods: {
        draw () {
            const angle = (this.value / this.total * 100) * 359.999 / 100;
            return this.getPath(40, -90, angle);
        }
    },
    props: {
        color: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            required: true
        },
        total: {
            type: Number,
            required: true
        },
        value: {
            type: Number,
            required: true
        }
    }
};