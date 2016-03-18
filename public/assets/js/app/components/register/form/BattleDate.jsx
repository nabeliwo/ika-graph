import * as React from 'react';
import { Component } from 'flumpt';
import moment from 'moment';
import DayPicker from 'react-day-picker';

export default class BattleDate extends Component {
  componentWillMount() {
    const date = new Date();

    this.current = {
      year: date.getFullYear(),
      month: date.getMonth()
    };
  }

  handleBtnClick(e) {
    const classList = e.target.nextSibling.classList;

    if (!classList.contains('is-active')) {
      classList.add('is-active');
    } else {
      classList.remove('is-active');
    }
  }

  handleDateClick(e, day) {
    const registerDate = document.getElementById('registerDate');

    registerDate.value = moment(day).format('YYYY/MM/DD');
    document.getElementById('registerCalendar').classList.remove('is-active');
  }

  render() {
    return (
      <div>
        <input id="registerDate" className="c-input is-middle" type="text" readOnly />
        <div className="p-register__form__btn c-btn c-btn--default" onClick={this.handleBtnClick}>日付を選択</div>
        <div id="registerCalendar" className="p-register__form__dayPicker">
          <DayPicker initialMonth={new Date(this.current.year, this.current.month)} onDayClick={this.handleDateClick} />
        </div>
      </div>
    );
  }
}
