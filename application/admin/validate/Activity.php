<?php

namespace app\admin\validate;

use think\Validate;

class Activity extends Validate
{
    /**
     * 验证规则
     */
    protected $rule = [
        'admin_id'    => 'require',
        'festival_id' => 'require',
        'title'       => 'require',
        'start_at'    => 'require',
        'end_at'      => 'require',
    ];
    /**
     * 提示消息
     */
    protected $message = [
        'admin_id.require'    => '未获取到管理员信息',
        'festival_id.require' => '请选择节日',
        'title.require'       => '请填写活动标题',
        'start_at.require'    => '请填写活动开始时间',
        'end_at.require'      => '请填写活动结束时间',
    ];
    /**
     * 验证场景
     */
    protected $scene = [
        'add'  => ['admin_id', 'festival_id', 'title', 'start_at', 'end_at'],
        'edit' => ['festival_id', 'title', 'start_at', 'end_at'],
    ];

}
