<?php

namespace app\admin\model;

use think\Model;


class Activity extends Model
{
    // 表名
    protected $name = 'activity';
    
    // 自动写入时间戳字段
    protected $autoWriteTimestamp = 'int';

    // 定义时间戳字段名
    protected $createTime = 'createtime';
    protected $updateTime = 'updatetime';
    protected $deleteTime = false;

    // 追加属性
    protected $append = [

    ];

    # 模型关联 start
    public function admin()
    {
        return $this->belongsTo(Admin::class, 'id', 'admin_id', [], 'LEFT')->setEagerlyType(0);
    }

    public function festival()
    {
        return $this->belongsTo(Festival::class, 'id', 'festival_id', [], 'LEFT')->setEagerlyType(0);
    }
    # 模型关联 end
}
