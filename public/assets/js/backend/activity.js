define(['jquery', 'bootstrap', 'backend', 'table', 'form'], function ($, undefined, Backend, Table, Form) {

    var Controller = {
        index: function () {
            // 初始化表格参数配置
            Table.api.init({
                extend: {
                    index_url: 'activity/index' + location.search,
                    add_url: 'activity/add',
                    edit_url: 'activity/edit',
                    del_url: 'activity/del',
                    multi_url: 'activity/multi',
                    table: 'activity',
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
                        {field: 'admin.username', title: __('Admin')},
                        {field: 'festival.name', title: __('Festival')},
                        {field: 'title', title: __('Title')},
                        {
                            field: 'is_set_prize',
                            width: "120px",
                            title: __('Is_set_prize'),
                            table: table,
                            events: Table.api.events.operate,
                            buttons: [
                                {
                                    name: 'prize_finish',
                                    text: __('已完成'),
                                    title: __('已完成'),
                                    classname: 'text-success'
                                },
                                {
                                    name: 'set_prize',
                                    text: '设置奖品',
                                    title: '设置奖品',
                                    classname: 'text-danger btn-dialog',
                                    url: '/EayIOJxtvB.php/activity/setprize'
                                },
                                {
                                    name: 'prize',
                                    text: '未完成',
                                    title: '未完成',
                                    classname: 'text-danger'
                                }
                            ],
                            formatter: function(value, row, index) {
                                var that = $.extend({}, this);
                                var table = $(that.table).clone(true);
                                //判断什么时候显示什么时候不显示
                                $(table).data("operate-del", null);
                                $(table).data("operate-edit", null);
                                if (row.Is_set_prize === 1) // 显示已完成
                                {
                                    $(table).data("operate-set_prize", null);
                                    $(table).data("operate-prize", null);
                                }else if (row.admin_id == Config.admin.id){ // 显示前往设置
                                    $(table).data("operate-prize_finish", null);
                                    $(table).data("operate-prize", null);
                                } else {
                                    $(table).data("operate-set_prize", null);
                                    $(table).data("operate-prize_finish", null);
                                }
                                that.table = table;
                                return Table.api.formatter.operate.call(that, value, row, index);
                            }
                        },
                        {
                            field: 'is_set_blade',
                            width: "120px",
                            title: __('Is_set_blade'),
                            table: table,
                            events: Table.api.events.operate,
                            buttons: [
                                {
                                    name: 'blade_finish',
                                    text: __('已完成'),
                                    title: __('已完成'),
                                    classname: 'text-success'
                                },
                                {
                                    name: 'set_blade',
                                    text: '设置模板',
                                    title: '设置模板',
                                    classname: 'text-danger btn-dialog',
                                    url: '/EayIOJxtvB.php/activity/setprize'
                                },
                                {
                                    name: 'blade',
                                    text: '未完成',
                                    title: '未完成',
                                    classname: 'text-danger'
                                }
                            ],
                            formatter: function(value, row, index) {
                                var that = $.extend({}, this);
                                var table = $(that.table).clone(true);
                                //判断什么时候显示什么时候不显示
                                $(table).data("operate-del", null);
                                $(table).data("operate-edit", null);
                                if (row.Is_set_prize === 1) // 显示已完成
                                {
                                    $(table).data("operate-set_blade", null);
                                    $(table).data("operate-blade", null);
                                }else if (row.admin_id == Config.admin.id){ // 显示前往设置
                                    $(table).data("operate-blade_finish", null);
                                    $(table).data("operate-blade", null);
                                } else {
                                    $(table).data("operate-set_blade", null);
                                    $(table).data("operate-blade_finish", null);
                                }
                                that.table = table;
                                return Table.api.formatter.operate.call(that, value, row, index);
                            }
                        },
                        {field: 'start_at', title: __('Start_at')},
                        {field: 'end_at', title: __('End_at')},
                        {field: 'status', title: __('Status'), formatter:function(value,row){
                                if (row.status === 1)
                                {
                                    return '<span style="color:green">开启中</span>';
                                } else {
                                    return '<span style="color:red">已关闭</span>';
                                }
                            }
                        },
                        {field: 'createtime', title: __('创建时间')},
                        {
                            field: 'operate',
                            title: __('Operate'),
                            table: table,
                            events: Table.api.events.operate,
                            formatter: function(value, row, index) {
                                var that = $.extend({}, this);
                                var table = $(that.table).clone(true);
                                //判断什么时候显示什么时候不显示
                                if (row.admin_id !== Config.admin.id) {
                                    $(table).data("operate-del", null);
                                    $(table).data("operate-edit", null);
                                }
                                that.table = table;
                                return Table.api.formatter.operate.call(that, value, row, index);
                            }
                        }
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
        setprize: function () {
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