define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'award_record/index' + location.search,
                    add_url: 'award_record/add',
                    edit_url: 'award_record/edit',
                    del_url: 'award_record/del',
                    multi_url: 'award_record/multi',
                    table: 'award_record',
                }
            });

            var table = $("#table");

            // 初始化表格
            table.bootstrapTable({
                url: $.fn.bootstrapTable.defaults.extend.index_url,
                pk: 'id',
                sortName: 'id',
                columns: [
                    [
                        {checkbox: true},
                        {field: 'id', title: __('Id')},
                        {field: 'activity_id', title: __('Activity_id')},
                        {field: 'share_nick', title: __('Share_nick')},
                        {field: 'share_avatar', title: __('Share_avatar'), events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'share_phone', title: __('Share_phone')},
                        {field: 'draw_nick', title: __('Draw_nick')},
                        {field: 'draw_avatar', title: __('Draw_avatar'), events: Table.api.events.image, formatter: Table.api.formatter.image},
                        {field: 'draw_mobile', title: __('Draw_mobile')},
                        {field: 'award_type', title: __('Award_type')},
                        {field: 'draw_addr', title: __('Draw_addr')},
                        {field: 'name', title: __('Name')},
                        {field: 'phone', title: __('Phone')},
                        {field: 'addr', title: __('Addr')},
                        {field: 'city', title: __('City')},
                        {field: 'createtime', title: __('Createtime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'updatetime', title: __('Updatetime'), operate:'RANGE', addclass:'datetimerange', formatter: Table.api.formatter.datetime},
                        {field: 'operate', title: __('Operate'), table: table, events: Table.api.events.operate, formatter: Table.api.formatter.operate}
                    ]
                ]
            });

            // 为表格绑定事件
            Table.api.bindevent(table);
        },
        add: function () {
            Controller.api.bindevent();
        },
        edit: function () {
            Controller.api.bindevent();
        },
        api: {
            bindevent: function () {
                Form.api.bindevent($("form[role=form]"));
            }
        }
    };
    return Controller;
});