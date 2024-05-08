// import dayjs from 'dayjs';
// import timezone from 'dayjs/plugin/timezone';
import { DateTime } from 'luxon';
import moment from 'moment';
import 'moment/locale/zh-cn';
import { useCallback, useMemo, useState } from 'react';
import { Calendar, luxonLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import * as dates from './dates';
import React from 'react';

// // 将日历选择为国际化
// moment.locale('zh-cn');
// dayjs.extend(timezone);

const LHBigCalendar = (props: any) => {
  const [myEvents, setEvents] = useState<any>([]);
  const [view, setView] = useState<any>('month');

  // 新增操作（大于当天无法填报）
  const handleSelectSlot = useCallback(
    (item: any) => {
      console.log('item', item);
    },
    [setEvents],
  );

  // 数据点击
  const handleSelectEvent = useCallback((event: any) => {
    console.log('event', event);
  }, []);

  // 初始化
  const { defaultDate, scrollToTime, views, messages } = useMemo(() => {
    return {
      defaultDate: new Date(),
      scrollToTime: new Date(),
      max: dates.add(dates.endOf(new Date(), 'day'), -1, 'hours'),
      views: ['month', 'week', 'day', 'agenda'],
      messages: {
        submit: '提交审核',
        date: '日期',
        time: '时间',
        event: '数据',
        allDay: '整天',
        week: '周',
        work_week: '工作周',
        day: '天',
        month: '月',
        previous: '上一页',
        next: '下一页',
        yesterday: '昨天',
        tomorrow: '明天',
        today: '今日',
        agenda: '月内',
        noEventsInRange: '暂无数据',
        showMore: (total: any) => `+${total} more`,
      },
    };
  }, []);

  const onView = useCallback(
    (newView: any) => {
      setView(newView);
    },
    [setView],
  );

  const formats = useMemo(
    () => ({
      dayRangeHeaderFormat: ({ start, end }: any) => {
        const starts = moment(start).format('YYYY年MM月DD日');
        const ends = moment(end).format('YYYY年MM月DD日');
        return `${starts}--${ends}`;
      },
      monthHeaderFormat: (date: moment.MomentInput) => {
        const newDate = moment(date).format('YYYY年MM月');
        return `${newDate}`;
      },
      agendaHeaderFormat: ({ start, end }: any) => {
        const starts = moment(start).format('YYYY年MM月DD日');
        const ends = moment(end).format('YYYY年MM月DD日');
        return `${starts}--${ends}`;
      },
    }),
    [],
  );

  return (
    <>
      <Calendar
        formats={formats}
        defaultDate={defaultDate}
        events={myEvents}
        localizer={luxonLocalizer(DateTime, { firstDayOfWeek: 8 })}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
        scrollToTime={scrollToTime}
        onView={onView}
        view={view}
        views={views}
        culture={'zh'}
        messages={messages}
        startAccessor="start"
        endAccessor="end"
        {...props}
      />
    </>
  );
};

export default LHBigCalendar;
