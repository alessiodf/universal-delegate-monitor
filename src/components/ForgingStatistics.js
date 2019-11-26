module.exports = {
    template: `
        <div class="flex flex-wrap w-full">
            <div class="flex flex-wrap w-full">
                <div class="w-1/2 lg:w-1/4 flex items-center px-5 my-6 mb-2 lg:border-r border-theme-line-separator flex-col sm:flex-row sm:text-left">
                    <div style="height: 50px; width: 50px; min-height: 50px; min-width: 50px">
                        <ForgingMeter icon="forging" :value="syncOrInit ? 1 : forging" :total="syncOrInit ? 1 : numberOfDelegates" color="#40a130" />
                    </div>
                    <div class="pl-3">
                        <div style="height: 1.44rem">
                            <h3 v-if="remaining >= 0 && !syncOrInit">{{ forging }}</h3>
                            <h4 v-else-if="syncOrInit">{{ syncOrInit }}...</h4>
                        </div>
                        <p v-if="remaining >= 0 || !connected">{{ syncOrInit ? getPhrase("PLEASE_WAIT") : getPhrase(forging === 1 ? "FORGED_RECENTLY_SINGULAR" : "FORGED_RECENTLY_PLURAL") }}</p>
                    </div>
                </div>
                <div class="w-1/2 lg:w-1/4 flex items-center px-5 my-6 mb-2 lg:border-r border-theme-line-separator flex-col sm:flex-row sm:text-left">
                    <div style="height: 50px; width: 50px; min-height: 50px; min-width: 50px">
                        <ForgingMeter icon="missing" :value="syncOrInit ? 1 : missing" :total="syncOrInit ? 1 : numberOfDelegates" color="#f5bd5c" />
                    </div>
                    <div class="pl-3">
                        <div style="height: 1.44rem">
                            <h3 v-if="remaining >= 0 && !syncOrInit">{{ missing }}</h3>
                            <h4 v-else-if="syncOrInit">{{ syncOrInit }}...</h4>
                        </div>
                        <p v-if="remaining >= 0 || !connected">{{ syncOrInit ? getPhrase("PLEASE_WAIT") : getPhrase(missing === 1 ? "MISSED_ROUND_SINGULAR" : "MISSED_ROUND_PLURAL") }}</p>
                    </div>
                </div>
                <div class="w-1/2 lg:w-1/4 flex items-center px-5 my-6 mb-2 lg:border-r border-theme-line-separator flex-col sm:flex-row sm:text-left">
                    <div style="height: 50px; width: 50px; min-height: 50px; min-width: 50px">
                        <ForgingMeter icon="notForging" :value="syncOrInit ? 1 : notForging" :total="syncOrInit ? 1 : numberOfDelegates" color="#e23a3e" />
                    </div>
                    <div class="pl-3">
                        <div style="height: 1.44rem">
                            <h3 v-if="remaining >= 0 && !syncOrInit">{{ notForging }}</h3>
                            <h4 v-else-if="syncOrInit">{{ syncOrInit }}...</h4>
                        </div>
                        <p v-if="remaining >= 0 || !connected">{{ syncOrInit ? getPhrase("PLEASE_WAIT") : getPhrase(notForging === 1 ? "NOT_FORGING_SINGULAR" : "NOT_FORGING_PLURAL") }}</p>
                    </div>
                </div>
                <div class="w-1/2 lg:w-1/4 flex items-center px-5 my-6 mb-2 flex-col sm:flex-row sm:text-left">
                    <div style="height: 50px; width: 50px; min-height: 50px; min-width: 50px">
                        <ForgingMeter icon="remaining" :value="syncOrInit ? 1 : remaining" :total="syncOrInit ? 1 : numberOfDelegates" color="#037cff" />
                    </div>
                    <div class="pl-3">
                        <div style="height: 1.44rem">
                            <h3 v-if="remaining >= 0 && !syncOrInit">{{ remaining }}</h3>
                            <h4 v-else-if="syncOrInit">{{ syncOrInit }}...</h4>
                        </div>
                        <p v-if="remaining >= 0 || !connected">{{ syncOrInit ? getPhrase("PLEASE_WAIT") : getPhrase(remaining === 1 ? "BLOCKS_LEFT_IN_ROUND_SINGULAR" : "BLOCKS_LEFT_IN_ROUND_PLURAL") }}</p>
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap w-full">
                <div class="w-1/2 lg:w-1/4 flex items-center px-5 my-6 lg:border-r border-theme-line-separator flex-col sm:flex-row sm:text-left">
                    <div style="height: 50px; width: 50px; min-height: 50px; min-width: 50px">
                        <ForgingMeter icon="down" :value="1" :total="1" color="#40a130" />
                    </div>
                    <div class="pl-3" style="overflow: hidden">
                        <div style="height: 1.44rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
                            <h4 style="display: inline" v-if="remaining >= 0 || !connected">{{ syncOrInit ? syncOrInit + "..." : lastForger }}</h4>
                        </div>
                        <p v-if="remaining >= 0 || !connected">{{ syncOrInit ? getPhrase("PLEASE_WAIT") : getPhrase("FORGED_LAST_BLOCK") }}</p>
                    </div>
                </div>
                <div class="w-1/2 lg:w-1/4 flex items-center px-5 my-6 lg:border-r border-theme-line-separator flex-col sm:flex-row sm:text-left">
                    <div style="height: 50px; width: 50px; min-height: 50px; min-width: 50px">
                        <ForgingMeter icon="up" :value="1" :total="1" color="#40a130" />
                    </div>
                    <div class="pl-3" style="overflow: hidden">
                        <div style="height: 1.44rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
                            <h4 style="display: inline" v-if="remaining > 0 && !syncOrInit && nextForger">{{ nextForger.name }}</h4>
                            <div v-else-if="lastForger && !syncOrInit" style="width: 3.6rem">
                                <Loader />
                            </div>
                            <h4 v-else-if="syncOrInit" style="display: inline"> {{ syncOrInit }}...</h4>
                        </div>
                        <p v-if="remaining >= 0 || !connected">{{ syncOrInit ? getPhrase("PLEASE_WAIT") : getPhrase("NEXT_TO_FORGE") }}</p>
                    </div>
                </div>
                <div class="w-1/2 lg:w-1/4 flex items-center px-5 my-6 lg:border-r border-theme-line-separator flex-col sm:flex-row sm:text-left">
                    <div style="height: 50px; width: 50px; min-height: 50px; min-width: 50px">
                        <ForgingMeter icon="block" :value="1" :total="1" color="#037cff" />
                    </div>
                    <div class="pl-3" style="overflow: hidden">
                        <div style="height: 1.44rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
                            <h4 style="display: inline" v-if="remaining >= 0 || !connected"><span v-if="!syncOrInit">{{ getPhrase(transactions === 1 ? "X_TRANSACTION" : "X_TRANSACTIONS", { transactions: transactions.toLocaleString() }) }}</span><span v-else>{{ syncOrInit }}...</span></h4>
                        </div>
                        <p v-if="remaining >= 0 || !connected">{{ syncOrInit ? getPhrase("PLEASE_WAIT") : getPhrase("IN_LAST_BLOCK") }}</p>
                    </div>
                </div>
                <div class="w-1/2 lg:w-1/4 flex items-center px-5 my-6 flex-col sm:flex-row sm:text-left">
                    <div style="height: 50px; width: 50px; min-height: 50px; min-width: 50px">
                        <ForgingMeter icon="timer" :value="1" :total="1" color="#037cff" />
                    </div>
                    <div class="pl-3" style="overflow: hidden">
                        <div style="height: 1.44rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis">
                            <h4 style="display: inline" v-if="remaining >= 0 || !connected">{{ syncOrInit ? syncOrInit + "..." : timeLeft }}</h4>
                        </div>
                        <p v-if="remaining >= 0 || !connected">{{ syncOrInit ? getPhrase("PLEASE_WAIT") : getPhrase("UNTIL_ROUND_ENDS") }}</p>
                    </div>
                </div>
            </div>
        </div>
    `,
    components: {
        ForgingMeter: require("./ForgingMeter")
    },
    data () {
        return {
            getPhrase (phrase, replace = {}) {
                const key = `${phrase}|${replace.delegate}|${replace.days}|${replace.hours}|${replace.months}|${replace.minutes}|${replace.seconds}|${replace.transactions}|${replace.years}`;
                if (this.phraseCache[key]) {
                    return this.phraseCache[key];
                }
                let localisedPhrase = this.phrases[phrase];
                for (const placeholder in replace) {
                    localisedPhrase = localisedPhrase.replace(new RegExp(`{${placeholder}}`, "g"), replace[placeholder]);
                }
                this.phraseCache[key] = localisedPhrase;
                return localisedPhrase;
            },
            phraseCache: {}
        };
    },
    props: {
        connected: {
            type: Boolean
        },
        forging: {
            type: Number
        },
        lastForger: {
            type: String
        },
        missing: {
            type: Number
        },
        nextForger: {
            type: Object
        },
        notForging: {
            type: Number
        },
        numberOfDelegates: {
            type: Number
        },
        phrases: {
            type: Object
        },
        remaining: {
            type: Number
        },
        syncOrInit: {
            type: String
        },
        timeLeft: {
            type: String
        },
        transactions: {
            type: Number
        }
    }
};