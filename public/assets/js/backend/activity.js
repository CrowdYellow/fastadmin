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
                        {field: 'admin_id', title: __('Admin_id')},
                        {field: 'festival_id', title: __('Festival_id')},
                        {field: 'title', title: __('Title')},
                        {field: 'is_set_blade', title: __('Is_set_blade') ,formatter:function(value,row){
                                if (row.is_set_blade === 1)
                                {
                                    return '<span style="color:green">已完成</span>';
                                }else if (row.admin_id == Config.admin.id){
                                    return '<span style="color:red">前往设置</span>';
                                } else {
                                    return '<span style="color:red">未完成</span>';
                                }
                            }
                        },
                        {field: 'is_set_prize', title: __('Is_set_prize') ,formatter:function(value,row){
                                if (row.is_set_prize === 1)
                                {
                                    return '<span style="color:green">已完成</span>';
                                }else if (row.admin_id == Config.admin.id){
                                    return '<span style="color:red">前往设置</span>';
                                } else {
                                    return '<span style="color:red">未完成</span>';
                                }
                            }
                        },
                        {field: 'start_at', title: __('Start_at')},
                        {field: 'end_at', title: __('End_at')},
                        {field: 'status', title: __('Status'), searchList: {"1": __('Yes'), "0": __('No')}, formatter: Table.api.formatter.toggle},
                        {field: 'createtime', title: __('创建时间')},
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