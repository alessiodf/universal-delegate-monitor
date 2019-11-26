module.exports = {
    template: `
        <div>
            <div v-if="configure" class="flex h-full">
                <div class="theme-dark bg-theme-feature text-theme-page-instructions-text hidden lg:flex flex-1 mr-4 rounded-lg overflow-y-auto">
                    <div class="m-auto w-3/5 text-center flex flex-col items-center justify-center">
                        <h1 class="text-inherit">
                            {{ getPhrase("MONITOR_DELEGATES") }}
                        </h1>
                        <p class="text-center py-2 leading-normal">
                            {{ getPhrase("CHOOSE_DELEGATES") }}.
                        </p>
                        <img :src="configureSvg" class="w-full xl:w-4/5 mt-10">
                    </div>
                </div>
                <div class="flex-none w-full lg:max-w-sm bg-theme-feature rounded-lg overflow-y-auto p-10">
                    <div class="flex-1">
                        <h2>{{ getPhrase("MONITOR_DELEGATES") }}</h2>
                        <div class="flex flex-col h-full w-full justify-around">
                            <h3 class="pt-6 pb-2">{{ getPhrase("ADD_DELEGATE") }}</h3>
                            <div class="block relative">
                                <MenuDropdown ref="dropdown" :items="filteredUsernames" :value="dropdownDelegate" @click="onDropdownFocus" @select="onDropdownSelect" :pin-to-input-width="true" class="mt-1" style="width: calc(100% - 10rem); display: inline-block; margin-right: 1.7rem">
                                    <InputField slot="handler" :helper-text="getHelperText()" :is-dirty="!!addedDelegate.length" :is-invalid="isInvalid" :label="getPhrase('ENTER_NAME')" class="InputDelegate text-left">
                                        <div slot-scope="{ inputClass }" :class="inputClass" class="flex flex-row">
                                            <input ref="input" @click="onDropdownFocus" @focus="onDropdownFocus" v-model="addedDelegate" name="delegate" type="text" class="InputDelegate__input flex flex-grow bg-transparent text-theme-page-text" @click.self.stop @keyup="onDropdownKey" @keyup.up="onDropdownKeyUp"
                                                @keyup.down="onDropdownKeyDown" @keyup.esc="onDropdownEsc" @keyup.enter="onDropdownEnter">
                                        </div>
                                    </InputField>
                                </MenuDropdown>
                                <ButtonGeneric :disabled="!usernames.includes(addedDelegate)" :label="getPhrase('ADD')" name="add" @click="add" class="absolute" style="right: 0" />
                            </div>
                            <h3 class="pt-6 pb-2">{{ getPhrase("SELECTED_DELEGATES") }}</h3>
                            <div class="vgt-wrap">
                                <div class="vgt-inner-wrap">
                                    <div class="vgt-fixed-header"></div>
                                    <div class="vgt-responsive">
                                        <table class="vgt-table bordered">
                                            <thead>
                                                <tr>
                                                    <th ref="delegate" @click="onSortChange('delegate')" class="vgt-right-align text-left sorting sorting-asc">
                                                        <span>{{ getPhrase("DELEGATE") }}</span>
                                                    </th>
                                                    <th class="vgt-right-align text-right not-sortable">
                                                        <span>{{ getPhrase("ACTIONS") }}</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody v-if="!currentDelegates.length" class="bg-theme-voting-banner-background">
                                                <tr>
                                                    <td colspan="2">
                                                        <div class="flex justify-center">
                                                            {{ getPhrase("NO_DELEGATES_SELECTED") }}.
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                            <tbody v-else>
                                                <tr v-for="delegate in currentDelegatesByFixedOrder">
                                                    <td class="text-left">
                                                        {{ delegate.name }}
                                                    </td>
                                                    <td class="text-right">
                                                        <span v-tooltip="{ content: getPhrase('REMOVE'), placement: 'left' }">
                                                            <button class="font-semibold text-xs hover:text-red text-theme-page-text-light p-1" @click="removeDelegate(delegate)">
                                                                <svg viewBox="0 0 16 16" version="1.1" x="0px" y="0px" width="16px" height="16px" class="SvgIcon fill-current"><use xlink:href="#delete-wallet"></use></svg>
                                                            </button>
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <footer class="mt-3 py-4" style="display: inline-flex">
                            <ButtonGeneric :label="getPhrase('BACK')" name="back" class="mr-2" @click="back()" />
                            <ButtonGeneric :label="getPhrase('SAVE')" name="save" @click="saveDelegates()" />
                        </footer>
                    </div>
                </div>
            </div>
            <div v-if="custom" class="flex h-full">
                <div class="theme-dark bg-theme-feature text-theme-page-instructions-text hidden lg:flex flex-1 mr-4 rounded-lg overflow-y-auto">
                    <div class="m-auto w-3/5 text-center flex flex-col items-center justify-center">
                        <h1 class="text-inherit">
                            {{ getPhrase("CUSTOM_OR_UNLISTED_NETWORK") }}
                        </h1>
                        <p class="text-center py-2 leading-normal">
                            {{ getPhrase("ENTER_CUSTOM_NETWORK_DETAILS") }}.
                        </p>
                        <img :src="customSvg" class="w-full xl:w-4/5 mt-10">
                    </div>
                </div>
                <div class="flex-none w-full lg:max-w-sm bg-theme-feature rounded-lg overflow-y-auto p-10">
                    <div class="flex-1">
                        <h2>{{ getPhrase("CUSTOM_OR_UNLISTED_NETWORK") }}</h2>
                        <div class="flex flex-col h-full w-full justify-around">
                            <h3 class="pt-6 pb-2">{{ getPhrase("CONNECT_TO_CUSTOM_NETWORK") }}</h3>
                            <div class="block">
                                <InputText :isDisabled="connecting" :helperText="customHost" :isInvalid="customHost !== ''" v-model="customHostValue" :label="getPhrase('IP_HOST')" :title="getPhrase('IP_HOST')" placeholder="1.2.3.4" name="custom-host" @input="updateCustomHost" class="my-3"
                                />
                                <InputText :isDisabled="connecting" :helperText="customPort" :isInvalid="customPort !== ''" v-model="customPortValue" :label="getPhrase('WEBSOCKET_PORT')" :title="getPhrase('WEBSOCKET_PORT')" placeholder="5003" name="custom-port" @input="updateCustomPort"
                                    class="my-3" />
                                <InputText :isDisabled="connecting" :helperText="customPath" :isInvalid="customPath !== ''" v-model="customPathValue" :label="getPhrase('WEBSOCKET_PATH')" :title="getPhrase('WEBSOCKET_PATH')" placeholder="/" name="custom-path" @input="updateCustomPath"
                                    class="my-3" />
                                <InputSwitch :is-disabled="connecting" v-model="customSecureValue">
                                    <div class="w-full">{{ getPhrase("CONNECT_USING_SSL_TLS_ENCRYPTION") }}</div>
                                </InputSwitch>
                            </div>
                        </div>
                    </div>
                    <div class="text-justify p-2 bg-theme-voting-banner-background font-semibold mt-6 text-sm">{{ getPhrase('REGISTRATION_INFO') }}, <a target="_blank" href="https://github.com/alessiodf/universal-delegate-monitor/#Registration">{{ getPhrase('REGISTRATION_INFO_LINK') }}</a>.</div>
                    <footer class="mt-3 py-4" style="display: inline-flex">
                        <ButtonGeneric :disabled='connecting' :label="getPhrase('BACK')" name="back" class="mr-2" @click="back()" />
                        <ButtonGeneric v-if="!connecting" :label="getPhrase('CONNECT')" name="connect" :disabled="customHostValue === null || customPortValue === null|| customHost !== '' || customPath !== '' || customPort !== ''" @click="connectCustom(customHostValue, customPortValue, customPathValue, customSecureValue)"
                        />
                        <button v-else class="ButtonGeneric blue-button" name="connect" disabled="disabled" style="height: 3.125rem"><Loader /></button>
                    </footer>
                </div>
            </div>
            <div v-if="!configure && !custom" class="WalletDetails flex flex-col v-full h-full flex-1 w-6/7">
                <div v-if="unavailable" class="hidden">
                    <div>
                        <h3>...</h3>
                    </div>
                </div>
                <div v-if="unavailable" class="flex flex-1 bg-theme-feature rounded-lg overflow-y-auto p-10 text-theme-page-instructions-text" style="flex-direction: column; align-items: center; justify-content: center">
                    <div class="text-center" style="margin: -1em 0 0.5em">
                        <h3 class="text-inherit"> {{ getPhrase("PROBLEM_FETCHING_DATA_TRY_LATER") }}.</h3>
                    </div>
                </div>
                <div v-if="isOK" class="WalletHeading flex pl-5 pr-3 py-8 w-full bg-theme-heading-background rounded-tl-lg rounded-tr-lg h-30 sticky pin-t z-20 justify-between">
                    <div class="flex items-center">
                        <div class="absolute pin-t pin-l h-30 w-40 overflow-hidden rounded-tl-lg">
                            <svg width="160" height="160" viewBox="0 0 100 100">
                        <rect width="130" height="70" rx="35" ry="40" transform="translate(0) rotate(240 37.5 37.5)" fill="#4c5082" fill-opacity="0.45" x="-20" y="0"></rect>
                      </svg>
                        </div>
                        <div class="relative">
                            <div style="background: rgba(255, 255, 255, 0.1); height: 75px; width: 75px; border-radius: 50%">
                                <img :src="network.icon" height="75" style="border-radius: 50%">
                            </div>
                        </div>
                        <div class="flex flex-col items-start justify-center text-white antialiased pl-4 z-10">
                            <div class="tracking-wide flex items-center font-bold">
                                <div>{{ network.name }}</div>
                                <span class="px-2 py-1 ml-2 mr-0 rounded-tl rounded-tr rounded-bl rounded-br text-white text-sm font-semibold" style="background: rgba(160, 160, 160, 0.33); color: white; text-transform: uppercase" v-tooltip="{ content: !connected ? getPhrase('CONNECTING_TO_NODE') : (data.syncing ? getPhrase('SYNCING_TO_NETWORK') : getPhrase('INITIALISING_NODE')) + '. ' + getPhrase('PLEASE_WAIT') + '.' }"
                                    v-if="!connected || data.syncing || !data.ready">{{ !connected ? getPhrase('CONNECTING') : (data.syncing ? getPhrase('SYNCHRONISING') : getPhrase('INITIALISING')) }}</span>
                            </div>
                            <div v-if="connected && data.height !== null" class="tracking-wide flex items-center text-sm font-semibold mt-3">{{ getPhrase("HEIGHT") }}: {{ data.height >= 0 ? data.height.toLocaleString() : getPhrase("UNKNOWN") }}</div>
                            <DelegateStatus v-if="!data.syncing && data.ready && connected && data.monitor.length" :delegates="data.monitor" />
                        </div>
                    </div>
                    <div class="flex items-right relative font-sans my-auto" style="min-width: 20.5rem; max-width: 20.5rem; justify-content: flex-end; right: 0.5rem">
                        <MenuDropdown ref="networks" :items="getNetworks" :value="dropdownNetwork" class="InputSelect" @select="onDropdownNetwork" containerClasses="w-80" :position="[horizontal, '0%']">
                            <template v-slot:handler="handlerScope">
                        <button :class="getNetworkStyle()" @click="onNetworkClick" @keyup.up="onNetworkKeyUp" @keyup.down="onNetworkKeyDown" @keyup.esc="onNetworkEsc" @keyup.enter="onDropdownNetwork(dropdownNetwork)">
                          <span class="font-semibold" style="margin-right: 0.35rem">{{ getPhrase("SELECT_NETWORK") }}</span>
                            <svg class="SvgIcon fill-current" viewBox="128 128 256 256" version="1.1" x="0px" y="0px" height="16" width="12">
                              <polygon points="128,192 256,320 384,192" />
                            </svg>
                        </button>
                      </template>
                        </MenuDropdown>
                        <button :disabled="!this.usernames.length" class="option-heading-button mr-2 px-3 py-2" style="margin: inherit" @click="configureDelegates()">
                      <span class="font-semibold">{{ getPhrase("MONITOR_DELEGATES") }}</span>
                    </button>
                    </div>
                </div>
                <div v-if="isOK && pinned" class="overflow-hidden overflow-y-auto p-5 pb-0 bg-theme-feature">
                    <div class="flex flex-wrap mt-1 mb-6 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg bg-theme-voting-banner-background relative">
                        <button class="absolute" style="right: 0; margin: 0.66rem" @click="togglePin()">
                            <div>
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" style="fill: var(--theme-page-text); height: 16px">
                                    <g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)"><path d="M6102.5,5015.5c-93.6-256.7-179.9-678.9-206.3-1012.4l-21.6-266.3l-1377-1374.6L3122.9,990.1l-167.9,24c-357.4,52.8-1029.2-4.8-1508.9-127.2l-115.2-28.8l930.8-930.8l933.2-933.2L1808.3-2392.5L421.7-3779.1l-163.1-508.6c-91.2-280.7-163.1-508.6-158.3-508.6c2.4,0,232.7,76.8,506.2,170.3l501.4,167.9L2492-3073.8l1386.6,1384.2l933.2-933.2L5745-3556l38.4,122.3c19.2,69.6,60,261.5,88.8,429.4c43.2,266.3,50.4,371.8,40.8,779.7l-12,470.2L7270.8-386.9L8640.5,980.5l215.9,16.8c119.9,9.6,302.3,31.2,407.8,50.4c227.9,43.2,635.7,153.5,635.7,175.1c0,7.2-851.6,873.2-1892.8,1921.6C6711.8,4449.4,6109.6,5039.5,6102.5,5015.5z"/></g>
                                </svg>
                            </div>
                        </button>
                        <ForgingStatistics :connected="connected" :forging="forging" :lastForger="data.lastForger" :missing="missing" :nextForger="data.delegates[0]" :notForging="notForging" :numberOfDelegates="numberOfDelegates" :phrases="phrases" :remaining="data.remaining" :syncOrInit="syncOrInit" :timeLeft="timeLeft" :transactions="data.transactions" />
                    </div>
                </div>
                <div v-if="isOK" class="flex-1 overflow-hidden overflow-y-auto p-5 bg-theme-feature rounded-bl-lg rounded-br-lg" :style="pinStyle">
                    <div v-if="!pinned" class="flex flex-wrap mt-1 rounded-tl-lg rounded-tr-lg rounded-bl-lg rounded-br-lg bg-theme-voting-banner-background relative" style="margin-bottom: 1.75rem">
                        <button class="absolute" style="right: 0; margin: 0.66rem" @click="togglePin()">
                            <div style="opacity: 0.3">
                                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" style="fill: var(--theme-page-text); height: 16px">
                                    <g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)"><path d="M6102.5,5015.5c-93.6-256.7-179.9-678.9-206.3-1012.4l-21.6-266.3l-1377-1374.6L3122.9,990.1l-167.9,24c-357.4,52.8-1029.2-4.8-1508.9-127.2l-115.2-28.8l930.8-930.8l933.2-933.2L1808.3-2392.5L421.7-3779.1l-163.1-508.6c-91.2-280.7-163.1-508.6-158.3-508.6c2.4,0,232.7,76.8,506.2,170.3l501.4,167.9L2492-3073.8l1386.6,1384.2l933.2-933.2L5745-3556l38.4,122.3c19.2,69.6,60,261.5,88.8,429.4c43.2,266.3,50.4,371.8,40.8,779.7l-12,470.2L7270.8-386.9L8640.5,980.5l215.9,16.8c119.9,9.6,302.3,31.2,407.8,50.4c227.9,43.2,635.7,153.5,635.7,175.1c0,7.2-851.6,873.2-1892.8,1921.6C6711.8,4449.4,6109.6,5039.5,6102.5,5015.5z"/></g>
                                </svg>
                            </div>
                        </button>
                        <ForgingStatistics :connected="connected" :forging="forging" :lastForger="data.lastForger" :missing="missing" :nextForger="data.delegates[0]" :notForging="notForging" :numberOfDelegates="numberOfDelegates" :phrases="phrases" :remaining="data.remaining" :syncOrInit="syncOrInit" :timeLeft="timeLeft" :transactions="data.transactions" />
                    </div>
                    <div class="mt-1 rounded-lg bg-theme-voting-banner-background vgt-wrap">
                        <div class="vgt-inner-wrap">
                            <div class="vgt-fixed-header"></div>
                            <div class="vgt-responsive">
                                <table class="vgt-table bordered">
                                    <thead>
                                        <tr>
                                            <th ref="rank" @click="onSortChange('rank')" class="vgt-right-align text-left pl-6 bg-theme-voting-banner-button rounded-tl-lg sorting sorting-asc" style="min-width: 12%; width: 12%; display: table-cell">
                                                <span>{{ getPhrase("RANK") }}</span>
                                            </th>
                                            <th ref="name" @click="onSortChange('name')" class="vgt-left-align text-left bg-theme-voting-banner-button" style="min-width: 18%; width: 18%; display: table-cell">
                                                <span>{{ getPhrase("DELEGATE") }}</span>
                                            </th>
                                            <th ref="last_forged_secs" @click="onSortChange('last_forged_secs')" class="vgt-right-align text-left bg-theme-voting-banner-button" style="min-width: 24%; width: 24%; display: table-cell">
                                                <span>{{ getPhrase("LAST_FORGED") }}</span>
                                            </th>
                                            <th ref="time_secs" @click="onSortChange('time_secs')" class="vgt-right-align text-left lg:table-cell sm:hidden bg-theme-voting-banner-button" style="min-width: 20%; width: 20%; display: table-cell">
                                                <span>{{ getPhrase("TIME_UNTIL_FORGING") }}</span>
                                            </th>
                                            <th ref="status" @click="onSortChange('status')" class="vgt-right-align text-center bg-theme-voting-banner-button" style="min-width: 8%; width: 8%; display: table-cell">
                                                <span>{{ getPhrase("STATUS") }}</span>
                                            </th>
                                            <th ref="weight" @click="onSortChange('weight')" class="vgt-right-align text-right pr-6 bg-theme-voting-banner-button rounded-tr-lg" style="min-width: 18%; width: 18%; display: table-cell; padding-right: 1.5rem">
                                                <span>{{ getPhrase("VOTE_WEIGHT") }}</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="!numberOfDelegates || !connected">
                                        <tr>
                                            <td colspan="6">
                                                <div class="flex justify-center">
                                                    <Loader />
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody v-else>
                                        <tr style="height: 1.0625rem" v-for="delegate in delegatesByFixedOrder">
                                            <td class="vgt-right-align text-left pl-6">
                                                {{ delegate.rank }}
                                            </td>
                                            <td class="vgt-left-align text-left">
                                                {{ delegate.name }}
                                            </td>
                                            <td class="vgt-right-align text-left">
                                                <span v-tooltip="{ content: delegate.last_forged_time }">{{ delegate.last_forged }}</span>
                                            </td>
                                            <td v-if="syncOrInit" class="vgt-right-align text-left">
                                                {{ syncOrInit }}...
                                            </td>
                                            <td v-else class="vgt-right-align text-left" :style="delegate.slot_passed">
                                                <span v-tooltip="{ content: delegate.time_due }">{{ delegate.time_until_forging }}</span>
                                            </td>
                                            <td class="vgt-right-align text-center">
                                                <div :tooltip="delegate.phrase" v-tooltip="{ content: delegate.phrase }">
                                                    <svg v-if="syncOrInit" viewBox="0 0 16 14" style="height: 1.0625rem" :aria-label="syncOrInit">
                                                      <path style="fill: var(--theme-page-text)" d="M1.779 12.1l1.429-1.412a4.674 4.674 0 006.413 0l2.695-2.672H9.941v-2H16v6h-2.02V9.193l-2.931 2.9a6.593 6.593 0 01-9.27 0zM0 7.912V1.906h2v2.823l2.9-2.9a6.645 6.645 0 019.18 0l-1.412 1.412a4.6 4.6 0 00-6.352 0L3.65 5.91H6v2z" />
                                                  </svg>
                                                    <svg v-else-if="delegate.status === 0" viewBox="0 0 16 16" style="height: 1.0625rem">
                                                      <path style="fill: var(--theme-page-text)" d="M11.13043,8.48694L9.04346,7.30432V4.52173c0-0.55652-0.48694-1.04346-1.04346-1.04346 S6.95654,3.96521,6.95654,4.52173v2.78259c0,0.20874,0.06952,0.41742,0.20868,0.6261 c-0.06958,0.34784,0.1391,0.76526,0.48694,0.97394l2.43481,1.3913c0.48694,0.27826,1.11304,0.1391,1.3913-0.41742 C11.82611,9.3913,11.61737,8.7652,11.13043,8.48694z" />
                                                      <path style="fill: var(--theme-page-text)" d="M13.94781,2.64349c-0.20868-0.20874-0.41736-0.41742-0.6261-0.6261C11.93042,0.7652,10.05219,0.06958,8.17389,0 H7.82605C5.94781,0.06958,4.06958,0.7652,2.67828,2.0174c-0.20874,0.20868-0.41742,0.41736-0.6261,0.6261 c-1.2522,1.3913-1.94781,3.26953-2.0174,5.14783c0,0.06952,0,0.06952,0,0.06952c0,0.06958,0,0.06958,0,0.06958v0.13916 c0,0.06958,0,0.06958,0,0.06958c0,0.06952,0,0.06952,0,0.06952c0.06958,1.8783,0.7652,3.75653,2.0174,5.14783 c0.20868,0.20874,0.41736,0.41742,0.6261,0.6261C4.06958,15.2348,5.87823,15.93042,7.75653,16h0.06952h0.20874h0.1391h0.06958 c1.87823-0.06958,3.68695-0.7652,5.07825-2.0174c0.20874-0.20868,0.41742-0.41736,0.6261-0.6261 c1.2522-1.3913,1.94781-3.20001,2.0174-5.07825c0-0.06958,0-0.06958,0-0.06958c0-0.06952,0-0.06952,0-0.06952 c0-0.06958,0-0.06958,0-0.06958V7.93042c0-0.06958,0-0.06958,0-0.06958c0-0.06952,0-0.06952,0-0.06952 c0-0.06958,0-0.06958,0-0.06958C15.89563,5.84351,15.20001,4.03479,13.94781,2.64349z M7.96521,13.91302 c-3.26959,0-5.91302-2.64343-5.91302-5.91302s2.64343-5.91302,5.91302-5.91302S13.87823,4.73041,13.87823,8 S11.2348,13.91302,7.96521,13.91302z" />
                                                  </svg>
                                                    <svg v-else-if="delegate.status === 1" viewBox="0 0 19 17" style="height: 1.0625rem">
                                                      <path :style="delegate.fill" d="M5.8,16.7c0.3,0.3,0.9,0.3,1.2,0c0,0,0,0,0,0L18.7,4.9c0.3-0.3,0.3-0.9,0-1.2l-2.4-2.5 c-0.3-0.3-0.9-0.3-1.2,0c0,0,0,0,0,0L6.4,10L3.9,7.6C3.6,7.2,3,7.2,2.7,7.6c0,0,0,0,0,0L0.3,10c-0.3,0.3-0.3,0.9,0,1.2L5.8,16.7z" />
                                                  </svg>
                                                    <svg v-else-if="delegate.status === 2" viewBox="0 0 19 17" style="height: 1.0625rem">
                                                      <path :style="delegate.fill" d="M12,17c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1h3c0.6,0,1,0.4,1,1v15c0,0.6-0.4,1-1,1L12,17z M4,17 c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1h3c0.6,0,1,0.4,1,1v15c0,0.6-0.4,1-1,1L4,17z" />
                                                  </svg>
                                                    <svg v-else-if="delegate.status === 3" viewBox="0 0 19 17" style="height: 1.0625rem">
                                                      <path :style="delegate.fill" d="M5.8,8.5L1.3,13c-0.4,0.4-0.4,1.1,0,1.5l2.2,2.2c0.4,0.4,1.1,0.4,1.5,0l4.5-4.5l4.5,4.5 c0.4,0.4,1.1,0.4,1.5,0l2.2-2.2c0.4-0.4,0.4-1.1,0-1.5l-4.5-4.5L17.7,4c0.4-0.4,0.4-1.1,0-1.5l-2.2-2.2c-0.4-0.4-1.1-0.4-1.5,0 L9.5,4.8L5,0.3C4.6-0.1,4-0.1,3.5,0.3L1.3,2.5C0.9,3,0.9,3.6,1.3,4L5.8,8.5z" />
                                                  </svg>
                                                </div>
                                            </td>
                                            <td class="vgt-right-align text-right pr-6">
                                                {{ delegate.weight }} {{ symbol }}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    components: {
        DelegateStatus: require("../components/DelegateStatus"),
        ForgingStatistics: require("../components/ForgingStatistics")
    },
    computed: {
        configureSvg: () => require("../components/ImageLoader").image("configure"),
        currentDelegatesByFixedOrder () {
            let orderA = this.configureSortOrder === "asc" ? 1 : -1;
            let orderB = this.configureSortOrder === "asc" ? -1 : 1;
            return Array.from(this.currentDelegates).sort((a, b) => (a.name > b.name) ? orderA : ((b.name > a.name) ? orderB : 0));
        },
        customHost () {
            if (this.customHostValue !== null) {
                this.customHostValue = this.customHostValue.trim();
                if (!this.customHostValue.length) {
                    return this.getPhrase("IP_HOST_REQUIRED");
                } else if (!/(?=^.{1,253}$)(^(((?!-)[a-zA-Z0-9-]{1,63}(?<!-))|((?!-)[a-zA-Z0-9-]{1,63}(?<!-)\.)+[a-zA-Z]{2,63})$)/.test(this.customHostValue) && !/((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))|(^\s*((?=.{1,255}$)(?=.*[A-Za-z].*)[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?(?:\.[0-9A-Za-z](?:(?:[0-9A-Za-z]|\b-){0,61}[0-9A-Za-z])?)*)\s*$)/.test(this.customHostValue)) {
                    return this.getPhrase("IP_HOST_NOT_VALID");
                }
            }
            return "";
        },
        customPath () {
            if (this.customPathValue !== null) {
                this.customPathValue = this.customPathValue.trim();
                if (!this.customPathValue.startsWith("/")) {
                    return this.getPhrase("WEBSOCKET_PATH_STARTS_WITH_SLASH");
                }
            }
            return "";
        },
        customPort () {
            if (this.customPortValue !== null) {
                this.customPortValue = this.customPortValue.trim();
                if (!this.customPortValue.length) {
                    return this.getPhrase("WEBSOCKET_PORT_REQUIRED");
                } else if (!/^[-]?[0-9]*$/.test(this.customPortValue) || this.customPortValue === "-") {
                    return this.getPhrase("WEBSOCKET_PORT_NOT_NUMERIC");
                } else if (parseInt(this.customPortValue, 10) < 1 || parseInt(this.customPortValue, 10) > 65535) {
                    return this.getPhrase("WEBSOCKET_PORT_NOT_VALID");
                }
            }
            return "";
        },
        customSvg: () => require("../components/ImageLoader").image("custom"),
        delegatesByFixedOrder () {
            let orderA = this.sortBy.order === "asc" ? 1 : -1;
            let orderB = this.sortBy.order === "asc" ? -1 : 1;
            if (this.sortBy.field === "last_forged_secs") {
                orderA *= -1;
                orderB *= -1;
            }
            return Array.from(this.data.delegates).sort((a, b) => (a[this.sortBy.field] > b[this.sortBy.field]) ? orderA : ((b[this.sortBy.field] > a[this.sortBy.field]) ? orderB : 0));
        },
        filteredUsernames () {
            return this.usernames.filter(username => username.includes(this.addedDelegate.toLowerCase()));
        },
        forging () {
            return this.data.delegates.filter(delegate => delegate.status === 1).length;
        },
        getNetworks () {
            const manifest = this.manifest || {};
            const networks = [];
            for (const nethash in manifest) {
                if (manifest[nethash].name && manifest[nethash].icon && manifest[nethash].urls && manifest[nethash].urls.length) {
                    networks.push(manifest[nethash].name);
                }
            }
            networks.push(this.getPhrase("CUSTOM_OR_UNLISTED_NETWORK") + "...");
            return networks;
        },
        horizontal () {
            const profile = walletApi.profiles.getCurrent();
            switch (profile.language) {
            case "en-US":
                return "-26.5%";
            case "it-IT":
                return "-31%";
            }
            return null;
        },
        isInvalid () {
            return !!this.addedDelegate.length && !this.usernames.includes(this.addedDelegate) && (!this.dropdown().hasItems || !this.dropdown().isOpen);
        },
        isOK () {
            return !this.unavailable && this.network.urls.length;
        },
        missing () {
            return this.data.delegates.filter(delegate => delegate.status === 2).length;
        },
        notForging () {
            return this.data.delegates.filter(delegate => delegate.status === 3).length;
        },
        numberOfDelegates () {
            return this.data.delegates.length;
        },
        pinStyle () {
            return this.pinned ? "padding-top: 0": "";
        },
        timeLeft () {
            const delegate = this.data.delegates.slice(this.data.remaining - 1, this.data.remaining)[0];
            if (!delegate) {
                return "0:00";
            }
            const secs = delegate.time_secs;
            const minutes = Math.floor(secs / 60);
            const seconds = (secs % 60).toString().padStart(2, "0");
            return `${minutes}:${seconds}`;
        },
        syncOrInit () {
            const syncState = this.getSyncState();
            if (syncState) {
                return this.getPhrase(syncState);
            }
            return "";
        }
    },
    data () {
        return {
            addedDelegate: "",
            configure: false,
            configureSortOrder: "asc",
            connected: false,
            connecting: false,
            currentDelegates: [],
            custom: false,
            customHostValue: null,
            customPathValue: null,
            customPortValue: null,
            customSecureValue: null,
            data: {
                delegates: [],
                height: null,
                lastForger: "",
                monitor: [],
                syncing: false,
                ready: false,
                remaining: -1,
                transactions: 0
            },
            dropdown: () => this.refs.dropdown,
            dropdownDelegate: "",
            dropdownNetwork: "",
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
            getSyncState () {
                if (this.connected && this.data.remaining >= 0) {
                    if (this.data.syncing) {
                        return "SYNCHRONISING";
                    } else if (!this.data.ready) {
                        return "INITIALISING";
                    } else {
                        return false;
                    }
                } else if(!this.connected) {
                    return "CONNECTING";
                }
                return false;
            },
            imageCache: {},
            input: () => this.refs.input,
            isValid: false,
            language: "en-US",
            network: { customUrl: null, name: null, icon: null, urls: [] },
            networks: () => this.refs.networks,
            manifest: null,
            monitoring: [],
            nethash: null,
            phraseCache: {},
            phrases: {},
            pinned: false,
            sortBy: { field: "rank", order: "asc" },
            symbol: null,
            usernames: [],
            unavailable: false,
            websocket: null
        };
    },
    destroyed () {
        if (this.websocket) {
            this.websocket.destroy();
        }
        this.websocket = null;
    },
    methods: {
        add () {
            if (!this.currentDelegates.map(delegate => delegate.name).includes(this.addedDelegate)) {
                this.currentDelegates.push({ name: this.addedDelegate });
            }
            this.addedDelegate = this.dropdownDelegate = "";
        },
        back () {
            this.configure = this.custom = false;
            this.$nextTick(() => {
                this.onSortChange();
            });
        },
        configureDelegates () {
            this.addedDelegate = this.dropdownDelegate = "";
            this.configure = true;
            this.currentDelegates = this.monitoring.map(delegate => ({ name: delegate }));
            this.configureSortOrder = "asc";
        },
        connect (nethash, url) {
            if (nethash !== this.nethash) {
                return;
            }
            if (this.websocket) {
                this.websocket.destroy();
                this.websocket = null;
            }
            let closed = false;
            const close = () => {
                if (closed) {
                    return;
                }
                closed = true;
                this.connected = false;
                const urlPool = this.network.customUrl ? [this.network.customUrl] : this.network.urls.filter(poolUrl => poolUrl !== url);
                if (!urlPool.length) {
                    urlPool.push(url);
                }
                const randomUrl = urlPool[Math.floor(Math.random() * urlPool.length)];
                if (url === randomUrl) {
                    walletApi.timers.setTimeout(() => this.connect(nethash, url), 5000);
                } else {
                    walletApi.timers.setTimeout(() => this.connect(nethash, randomUrl), 1000);
                }
            };
            this.websocket = walletApi.websocket.connect(url);
            this.websocket.on("open", () => {
                this.updateMonitor();
            });
            this.websocket.on("error", () => {
                setImmediate(() => {
                    close();
                });
            });
            this.websocket.on("close", () => {
                setImmediate(() => {
                    close();
                });
            });
            this.websocket.on("message", message => {
                const data = JSON.parse(message.data);
                if (data.nethash && data.nethash !== this.nethash) {
                    this.websocket.close();
                } else if (data.symbol) {
                    this.symbol = data.symbol;
                } else if (data.delegates) {
                    const forgingDelegates = data.delegates.filter(delegate => this.monitoring.includes(delegate.name)).map(delegate => ({name: delegate.name, status: delegate.status, time_secs: delegate.time_secs, will_forge: data.delegates.map(delegate => delegate.name).indexOf(delegate.name) < data.remaining }));
                    const notForgingDelegates = this.monitoring.filter(delegate => !Object.values(forgingDelegates.map(delegate => delegate.name)).includes(delegate)).map(delegate => ({ name: delegate, status: -1 }));
                    data.monitor = [...forgingDelegates, ...notForgingDelegates];
                    let syncingOrNotReady = data.syncing || ! data.ready;
                    let delegateMap = data.delegates.map(delegate => delegate.name);
                    const now = new Date().getTime() / 1000;
                    const syncState = this.getSyncState();
                    for (const delegate of data.delegates) {
                        delegate.slot_passed = syncingOrNotReady || delegateMap.indexOf(delegate.name) + 1 > data.remaining ? "opacity: 0.66; font-style: italic" : "";
                        delegate.last_forged_time = !isNaN(delegate.last_forged) ? new Date(delegate.last_forged * 1000).toLocaleString() : this.getPhrase("NEVER_FORGED");
                        delegate.last_forged_secs = delegate.last_forged;
                        delegate.last_forged = this.timeAgo(now, delegate.last_forged);
                        delegate.time_due = new Date(delegate.time_due * 1000).toLocaleString();
                        delegate.time_until_forging = this.formatTime(delegate.time_secs, delegate.slot_passed);
                        delegate.weight = (delegate.weight / 100000000).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                        delegate.fill = "fill: ";
                        switch (delegate.status) {
                        case 0:
                            delegate.phrase = "WAITING_TO_FORGE";
                            break;
                        case 1:
                            delegate.fill += "#40a130";
                            delegate.phrase = "FORGED_RECENTLY_SINGULAR";
                            break;
                        case 2:
                            delegate.fill += "#f5bd5c";
                            delegate.phrase = "MISSED_ROUND_RECENTLY";
                            break;
                        case 3:
                            delegate.fill += "#e23a3e";
                            delegate.phrase = "NOT_FORGED_RECENTLY";
                            break;
                        }
                        if (!delegate.slot_passed) {
                            delegate.fill = "fill: var(--theme-page-text)";
                        }
                        if (syncState && syncState !== "CONNECTING") {
                            delegate.phrase = this.getPhrase("BLOCKCHAIN_IS_" + syncState);
                        } else {
                            delegate.phrase = this.getPhrase(delegate.phrase);
                        }
                    }
                    this.data = data;
                    this.connected = true;
                } else if (data.usernames) {
                    this.usernames = data.usernames;
                    this.usernames.sort();
                }
            });
        },
        connectCustom (host, port, path, secure) {
            this.connecting = true;
            let shownError = false;
            let timer;
            let websocket;
            const url = (secure ? "wss://" : "ws://") + host + ":" + port + (path || "");
            const close = error => {
                walletApi.timers.clearTimeout(timer);
                if (websocket && typeof(websocket.destroy) === "function") {
                    websocket.destroy();
                }
                if (error && !shownError) {
                    walletApi.alert.error(`Could not connect to ${url}`);
                    shownError = true;
                }
                this.connecting = false;
            };
            timer = walletApi.timers.setTimeout(() => {
                close(true);
            }, 5000);
            websocket = walletApi.websocket.connect(url);
            websocket.on("error", () => {
                setImmediate(() => {
                    close(true);
                });
            });
            websocket.on("close", () => {
                setImmediate(() => {
                    close(true);
                });
            });
            websocket.on("message", message => {
                try {
                    const data = JSON.parse(message.data);
                    if (data.nethash) {
                        close(false);
                        this.connecting = true;
                        this.nethash = data.nethash;
                        this.network.customUrl = url;
                        this.connect(this.nethash, url);
                        this.updateNetwork();
                        this.custom = false;
                        this.$nextTick(() => {
                            this.onSortChange();
                        });
                    } else if (!data.delegates && !data.usernames) {
                        close(true);
                    }
                } catch (error) {
                    close(true);
                }
            });
        },
        async fetchManifest () {
            const manifestUrl = require("../../package.json").manifest;
            try {
                const response = await walletApi.http.get(manifestUrl + "?" + new Date().getTime());
                this.manifest = JSON.parse(response.body);
                walletApi.storage.set("manifest", this.manifest, true);
            } catch (error) {
                if (!this.manifest) {
                    this.unavailable = true;
                }
            }
        },
        formatTime (secs, passed) {
            const minutes = Math.floor(secs / 60);
            const seconds = secs % 60;
            let time = "";
            if (minutes > 1 && seconds > 1) {
                time = this.getPhrase("X_MINS_AND_X_SECS", { minutes, seconds });
            } else if (minutes > 1 && seconds === 1) {
                time = this.getPhrase("X_MINS_AND_X_SEC", { minutes, seconds });
            } else if (minutes > 1 && seconds === 0) {
                time = this.getPhrase("X_MINUTES", { minutes });
            } else if (minutes === 1 && seconds > 1) {
                time = this.getPhrase("X_MIN_AND_X_SECS", { minutes, seconds });
            } else if (minutes === 1 && seconds === 1) {
                time = this.getPhrase("X_MIN_AND_X_SEC", { minutes, seconds });
            } else if (minutes === 1 && seconds === 0) {
                time = this.getPhrase("X_MINUTE", { minutes });
            } else if (minutes === 0 && seconds > 1) {
                time = this.getPhrase("X_SECONDS", { seconds });
            } else if (minutes === 0 && seconds === 1) {
                time = this.getPhrase("X_SECOND", { seconds });
            }
            return time ? time : (passed ? this.getPhrase("FORGED") : this.getPhrase("NOW")) + "!";
        },
        getHelperText () {
            return this.isInvalid ? this.getPhrase("DELEGATE_NOT_FOUND", { delegate: this.addedDelegate }) : "";
        },
        getNetworkStyle () {
            let style = "flex items-center justify-center option-heading-button mr-2 px-3 py-2";
            if (this.networks() && this.networks().isOpen) {
                style += " bg-theme-button-special-choice text-white";
            }
            return style;
        },
        onDropdownEnter () {
            if (this.dropdownDelegate) {
                this.addedDelegate = this.dropdownDelegate;
                this.dropdown().close();
                this.input().setSelectionRange(this.addedDelegate.length, this.addedDelegate.length);
            }
            if (this.usernames.includes(this.addedDelegate)) {
                this.add();
            }
        },
        onDropdownEsc () {
            this.dropdown().close();
        },
        onDropdownFocus () {
            this.dropdown().open();
        },
        onDropdownNetwork (value) {
            for (const nethash in this.manifest) {
                if (this.manifest[nethash].name === value) {
                    this.parseManifest(nethash);
                    return;
                }
            }
            this.connecting = false;
            this.customHostValue = null;
            this.customPathValue = null;
            this.customPortValue = null;
            this.customSecureValue = null;
            this.custom = true;
        },
        onDropdownSelect (value) {
            this.addedDelegate = value;
            if (this.usernames.includes(this.addedDelegate)) {
                this.add();
            }
        },
        onDropdownKey (event) {
            if (event.which !== 13) {
                if (event.which != 38 && event.which != 40) {
                    this.dropdownDelegate = this.addedDelegate;
                }
                if (!this.dropdown().isOpen) {
                    this.dropdown().open();
                }
            }
        },
        onDropdownKeyDown () {
            if (this.dropdown().isOpen && this.dropdown().hasItems) {
                let index = -1;
                const entries = Object.keys(this.dropdown().entries);
                if (this.dropdownDelegate !== "") {
                    index = entries.indexOf(this.dropdownDelegate);
                }
                if (index >= entries.length - 1) {
                    index = entries.length - 2;
                }
                this.dropdownDelegate = entries[index + 1];
            }
        },
        onDropdownKeyUp () {
            if (this.dropdown().isOpen && this.dropdown().hasItems) {
                let index = -1;
                const entries = Object.keys(this.dropdown().entries);
                if (this.dropdownDelegate !== "") {
                    index = entries.indexOf(this.dropdownDelegate);
                }
                if (index < 1) {
                    index = 1;
                }
                this.dropdownDelegate = entries[index - 1];
            }
        },
        onNetworkClick () {
            if (!this.networks().isOpen) {
                this.dropdownNetwork = this.network.name;
            }
        },
        onNetworkEsc () {
            this.networks().close();
        },
        onNetworkKeyDown () {
            if (this.networks().isOpen && this.networks().hasItems) {
                let index = -1;
                const entries = Object.keys(this.networks().entries);
                if (this.dropdownNetwork !== "") {
                    index = entries.indexOf(this.dropdownNetwork);
                }
                if (index >= entries.length - 1) {
                    index = entries.length - 2;
                }
                this.dropdownNetwork = entries[index + 1];
            }
        },
        onNetworkKeyUp () {
            if (this.networks().isOpen && this.networks().hasItems) {
                let index = -1;
                const entries = Object.keys(this.networks().entries);
                if (this.dropdownNetwork !== "") {
                    index = entries.indexOf(this.dropdownNetwork);
                }
                if (index < 1) {
                    index = 1;
                }
                this.dropdownNetwork = entries[index - 1];
            }
        },
        onSortChange (heading) {
            if (heading === "delegate") {
                this.configureSortOrder = this.refs[heading].classList.contains("sorting-asc") ? "desc" : "asc";
                this.refs[heading].classList.remove("sorting-asc");
                this.refs[heading].classList.remove("sorting-desc");
                this.refs[heading].classList.add("sorting-" + this.configureSortOrder);
                return;
            }
            if (this.sortBy.field === heading) {
                this.sortBy.order = this.sortBy.order === "asc" ? "desc" : "asc";
            } else if (heading) {
                this.sortBy = { field: heading, order: "asc" };
            }
            const refs = ["rank", "name", "last_forged_secs", "time_secs", "status", "weight"];
            for (const ref of refs) {
                this.refs[ref].classList.remove("sorting");
                this.refs[ref].classList.remove("sorting-asc");
                this.refs[ref].classList.remove("sorting-desc");
            }
            this.refs[this.sortBy.field].classList.add("sorting");
            this.refs[this.sortBy.field].classList.add("sorting-" + this.sortBy.order);
        },
        parseManifest (nethash) {
            const network = this.manifest[nethash];
            this.dropdownNetwork = network.name;
            this.network.urls = network.urls;
            this.network.customUrl = null;
            if (this.nethash !== nethash) {
                this.nethash = nethash;
                this.updateNetwork();
                if (this.websocket) {
                    this.websocket.close();
                }
                const url = this.network.urls[Math.floor(Math.random() * this.network.urls.length)];
                this.connect(this.nethash, url);
            }
        },
        removeDelegate (row) {
            this.currentDelegates = this.currentDelegates.filter(delegate => delegate.name !== row.name);
        },
        saveDelegates () {
            const store = walletApi.storage.get(this.nethash, true) || {};
            store.monitor = this.currentDelegates.map(delegate => delegate.name);
            walletApi.storage.set(this.nethash, store, true);
            this.configure = false;
            this.updateMonitor();
            this.$nextTick(() => {
                this.onSortChange();
            });
        },
        timeAgo (now, timestamp) {
            if (isNaN(timestamp) || timestamp === null) {
                return this.getPhrase("NEVER");
            }
            const secondsAgo = now - parseInt(timestamp, 10);
            if (secondsAgo < 5) {
                return this.getPhrase("A_FEW_SECONDS_AGO");
            } else if (secondsAgo < 60) {
                return this.getPhrase("LESS_THAN_A_MINUTE_AGO");
            } else if (secondsAgo < 3600) {
                const minutes = Math.floor(secondsAgo / 60);
                return minutes === 1 ? this.getPhrase("A_MINUTE_AGO") : this.getPhrase("X_MINUTES_AGO", { minutes });
            } else if (secondsAgo < 86400) {
                const hours = Math.floor(secondsAgo / 3600);
                return hours === 1 ? this.getPhrase("AN_HOUR_AGO") : this.getPhrase("X_HOURS_AGO", { hours });
            } else if (secondsAgo < 2592000) {
                const days = Math.floor(secondsAgo / 86400);
                return days === 1 ? this.getPhrase("A_DAY_AGO") : this.getPhrase("X_DAYS_AGO", { days });
            } else if (secondsAgo < 31536000) {
                const months = Math.floor(secondsAgo / 2592000);
                return months === 1 ? this.getPhrase("A_MONTH_AGO") : this.getPhrase("X_MONTHS_AGO", { months });
            } else {
                const years = Math.floor(secondsAgo / 31536000);
                return years === 1 ? this.getPhrase("A_YEAR_AGO") : this.getPhrase("X_YEARS_AGO", { years });
            }
        },
        togglePin () {
            this.pinned = !this.pinned;
            walletApi.storage.set("pinned", this.pinned, true);
        },
        updateCustomHost (value) {
            this.customHostValue = value;
        },
        updateCustomPath (value) {
            this.customPathValue = value;
        },
        updateCustomPort (value) {
            this.customPortValue = value.replace(/^(?!0$)0+/, "");
        },
        updateMonitor () {
            const store = walletApi.storage.get(this.nethash, true) || {};
            this.monitoring = store.monitor || [];
            this.monitoring.sort();
            const forgingDelegates = this.data.delegates.filter(delegate => this.monitoring.includes(delegate.name)).map(delegate => ({name: delegate.name, status: delegate.status, time_secs: delegate.time_secs, will_forge: this.data.delegates.map(delegate => delegate.name).indexOf(delegate.name) < this.data.remaining }));
            const notForgingDelegates = this.monitoring.filter(delegate => !Object.values(forgingDelegates.map(delegate => delegate.name)).includes(delegate)).map(delegate => ({ name: delegate, status: -1 }));
            this.data.monitor = [...forgingDelegates, ...notForgingDelegates];
        },
        updateNetwork () {
            this.connected = false;
            this.data = {
                delegates: [],
                height: null,
                lastForger: "",
                monitor: [],
                syncing: false,
                ready: false,
                remaining: -1,
                transactions: 0
            };
            this.monitoring = [];
            this.usernames = [];
            const ImageLoader = require("../components/ImageLoader");
            const network = this.manifest[this.nethash] || {};
            const store = walletApi.storage.get("cache", true) || {};
            this.network.name = network.name || this.getPhrase("CUSTOM_NETWORK");
            this.network.icon = store[this.nethash] || ImageLoader.image("default");
            const nethash = this.nethash;
            if (!this.imageCache[nethash] && network.icon) {
                walletApi.http.get(network.icon + "?" + new Date().getTime(), { encoding: null }).then(response => {
                    this.imageCache[nethash] = true;
                    const mime = response.headers["content-type"];
                    this.network.icon = `data:${mime}+xml;base64,` + response.body.toString("base64");
                    store[nethash] = this.network.icon;
                    walletApi.storage.set("cache", store, true);
                }).catch(() => {
                    //
                });
            }
        }
    },
    async mounted () {
        this.pinned = walletApi.storage.get("pinned", true) || false;
        const profile = walletApi.profiles.getCurrent();
        try {
            this.phrases = require(`../../${profile.language}.json`);
        } catch (error) {
            this.phrases = require("../../en-US.json");
        }
        const nethash = profile.network.nethash;
        this.manifest = walletApi.storage.get("manifest", true) || {};
        let manifest = this.manifest[nethash];
        if (manifest && manifest.name && manifest.icon && manifest.urls && manifest.urls.length) {
            this.parseManifest(nethash);
        }
        await this.fetchManifest();
        manifest = this.manifest[nethash];
        if (manifest && manifest.name && manifest.icon && manifest.urls && manifest.urls.length) {
            this.parseManifest(nethash);
        } else if (this.manifest) {
            for (const nethash in this.manifest) {
                manifest = this.manifest[nethash];
                if (manifest && manifest.name && manifest.icon && manifest.urls && manifest.urls.length) {
                    this.parseManifest(nethash);
                    return;
                }
            }
            this.unavailable = true;
        }
    }
};
