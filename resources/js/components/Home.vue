<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">Calendar</div>

                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-4">
                                <form @submit.prevent="submit()">
                                    <div class="form-group">
                                        <label for="event">Event</label>
                                        <input v-model="event" type="text" class="form-control" id="event" name="event" placeholder="Enter Event..." v-validate="'required'" data-vv-as="Event"  :disabled="submitting" />
                                        <div class="invalid-feedback">{{ errors.first("event") }}</div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-md-6">
                                                <label for="datepicker1">From</label>
                                                <date-picker class="form-control" :class="{ 'is-invalid': errors.first('datepicker1') != null }" id="datepicker1" name="datepicker1" ref="datepicker1"  v-model="dateFrom" :config="datepickerOption1" v-validate="'required'" data-vv-as="From Date"  :disabled="submitting"></date-picker>
                                                <div class="invalid-feedback">{{ errors.first('datepicker1') }}</div>
                                            </div>
                                            <div class="col-md-6">
                                                <label for="datepicker2">To</label>
                                                <date-picker class="form-control" :class="{ 'is-invalid': errors.first('datepicker2') != null }" id="datepicker2" name="datepicker2" ref="datepicker2" v-model="dateTo" :config="datepickerOption2" v-validate="'required'" data-vv-as="To Date"  :disabled="submitting"></date-picker>
                                                <div class="invalid-feedback">{{ errors.first('datepicker2') }}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-check-inline">
                                        <label class="form-check-label" for="dayMon">
                                            <input v-model="checkedDays" type="checkbox" class="form-check-input" id="dayMon" name="checkedDays" value="Mon" v-validate="'required|length:1,7'" data-vv-as="Days"  :disabled="submitting" /> Mon
                                        </label>
                                    </div>
                                    <div class="form-check-inline">
                                        <label class="form-check-label" for="dayTue">
                                            <input v-model="checkedDays" type="checkbox" class="form-check-input" id="dayTue" name="checkedDays" value="Tue"  :disabled="submitting" /> Tue
                                        </label>
                                    </div>
                                    <div class="form-check-inline">
                                        <label class="form-check-label" for="dayWed">
                                            <input v-model="checkedDays" type="checkbox" class="form-check-input" id="dayWed" name="checkedDays" value="Wed"  :disabled="submitting" /> Wed
                                        </label>
                                    </div>
                                    <div class="form-check-inline">
                                        <label class="form-check-label" for="dayThu">
                                            <input v-model="checkedDays" type="checkbox" class="form-check-input" id="dayThu" name="checkedDays" value="Thu"  :disabled="submitting" /> Thu
                                        </label>
                                    </div>
                                    <div class="form-check-inline">
                                        <label class="form-check-label" for="dayFri">
                                            <input v-model="checkedDays" type="checkbox" class="form-check-input" id="dayFri" name="checkedDays" value="Fri"  :disabled="submitting" /> Fri
                                        </label>
                                    </div>
                                    <div class="form-check-inline">
                                        <label class="form-check-label" for="daySat">
                                            <input v-model="checkedDays" type="checkbox" class="form-check-input" id="daySat" name="checkedDays" value="Sat"  :disabled="submitting" /> Sat
                                        </label>
                                    </div>
                                    <div class="form-check-inline">
                                        <label class="form-check-label" for="daySun">
                                            <input v-model="checkedDays" type="checkbox" class="form-check-input" id="daySun" name="checkedDays" value="Sun"  :disabled="submitting" /> Sun
                                        </label>
                                    </div>
                                    <div class="invalid-feedback" :class="{ 'd-block': errors.first('checkedDays') != null  }">{{ errors.first('checkedDays') }}</div>
                                    <div class="form-group mt-3">
                                        <input type="submit" value="Save" class="btn btn-primary" :disabled="submitting" id="saveBtn" />
                                    </div>
                                </form>
                            </div>
                            <div class="col-md-8">
                                <h3>
                                    <b>{{ moment().month(moment().month()).format('MMM') }} {{ moment().year() }}</b>
                                </h3>

                                <div class="table-responsive">
                                    <table class="table table-hover" id="dayTable" style="width: 100%;">
                                        <tbody>
                                            <tr v-for="(day, index) in daysArray" :key="index" id="dayBlock" :data-daydate="day[0]" :data-dayname="day[1]">
                                                <td class="row">
                                                    <div class="col-md-3">
                                                        {{ day[0] + ' - ' + day[1] }}
                                                    </div>
                                                    <div class="col-md-9">
                                                        <span class="ml-5 eventContainer"></span>
                                                    </div>
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
        </div>
    </div>
</template>

<script>
    import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

    import { mapGetters } from 'vuex';

    import Header from './Header';

    export default {
        data() {
            return {
                event: '',
                dateTo: '',
                dateFrom: '',
                checkedDays: [],
                datepickerOption1: {
                    format: 'YYYY-MM-DD'
                },
                datepickerOption2: {
                    format: 'YYYY-MM-DD',
                    useCurrent: false
                },
                events: [],
                daysArray: [],
                dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                submitting: false,
            }
        },
        computed: {
            ...mapGetters({
                isLoggedIn : 'loginStatus',
                base_url : 'baseUrl'
            })
        },
        methods: {
            moment(date) {
                return moment(date);
            },
            getDaysArray(month, year){
                let date = new Date(year, month - 1, 1);
                let result = [];

                while (date.getMonth() == month - 1) {
                    // result.push(date.getDate() + "-" + this.dayNames[date.getDay()]);
                    let dayContainer = [];
                    dayContainer[0] = date.getDate();
                    dayContainer[1] = this.dayNames[date.getDay()];

                    result.push(dayContainer);
                    date.setDate(date.getDate() + 1);
                }

                return result;
            },
            submit(e) {
                this.submitting = true;

                $('#dayTable > tbody  > tr#dayBlock').removeClass('table-success').children().children().find('.eventContainer').text('');

                let dayFrom = parseInt(moment(this.dateFrom).format('D'));
                let dayTo = parseInt(moment(this.dateTo).format('D'));

                this.$validator.validateAll().then((result) => {
                    if (result) {
                        let formData = new FormData();
                        formData.append('event', this.event);
                        formData.append('dateFrom', this.dateFrom);
                        formData.append('dateTo', this.dateTo);
                        formData.append('checkedDays', this.checkedDays);

                        axios.post('/api/v1/save-event', formData).then(response => {
                            if (response.data.success) {
                                $('#dayTable > tbody  > tr#dayBlock').each((i, e) => {
                                    let $this = $(e);
                                    let dayTableDayDate = $this.data('daydate');
                                    let dayTableDayName = $this.data('dayname');

                                    if (dayTableDayDate >= dayFrom && dayTableDayDate <= dayTo) {
                                        if (this.checkedDays.includes(dayTableDayName)) {
                                            $this.addClass('table-success').children().children().find('.eventContainer').text(this.event);
                                        }
                                    }
                                });

                                this.$toastr.s('Event successfully saved');
                                this.clearForm();
                            } else {
                                this.submitting = false;
                                this.$toastr.e('Error saving event');

                                console.log(response);
                            }
                        }).catch(error => {
                            this.clearForm();
                            console.log(error);
                        });

                        return;
                    }

                    this.$toastr.e('Please fill the required fields in the form.');
                }).catch((e) =>  {
                    console.log(e);
                });
            },
            clearForm() {
                this.submitting = false;
                this.event = '';
                this.dateFrom = '';
                this.dateTo = '';
                this.checkedDays = [];
                this.$validator.reset();
            }
        },
        filters: {
            moment: function(date) {
                return moment(date).format('MMMM Do YYYY, h:mm:ss a');
            }
        },
        mounted() {
            this.daysArray = this.getDaysArray(moment().month() + 1,moment().year());

            let date = new Date();

            let firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
            let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

            Vue.set(this.datepickerOption1, 'minDate', firstDay);
            Vue.set(this.datepickerOption1, 'maxDate', lastDay);
            Vue.set(this.datepickerOption2, 'minDate', firstDay);
            Vue.set(this.datepickerOption2, 'maxDate', lastDay);

            $("#datepicker1").on("dp.change", function (e) {
                $('#datepicker2').data("DateTimePicker").minDate(e.date);
            });
            $("#datepicker2").on("dp.change", function (e) {
                $('#datepicker1').data("DateTimePicker").maxDate(e.date);
            });
        }
    }
</script>
