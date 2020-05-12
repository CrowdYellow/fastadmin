<?php

namespace app\admin\controller;

use app\common\controller\Backend;

/**
 *
 *
 * @icon fa fa-circle-o
 */
class Activity extends Backend
{

    protected $relationSearch = true;

    /**
     * Activity模型对象
     * @var \app\admin\model\Activity
     */
    protected $model = null;

    public function _initialize()
    {
        parent::_initialize();
        $this->model = new \app\admin\model\Activity;
        $this->assignconfig("admin", ['id' => $this->auth->id]);
    }

    public function add()
    {
        if ($this->request->isPost()) {
            $this->token();
            $params             = $this->request->post("row/a");
            $admin              = \think\Session::get('admin');
            $params['admin_id'] = $admin['id'];
            $result             = $this->model->validate('Activity.add')->save($params);
            if ($result === false) {
                $this->error($this->model->getError());
            }
            $this->success('活动创建成功，完成模板和奖品配置后才能开启活动！');
        }
        return $this->view->fetch();
    }

    public function edit($ids = null)
    {
        $row = $this->model->get(['id' => $ids]);
        if (!$row) {
            $this->error(__('No Results were found'));
        }
        # 检查权限
        if ($row->admin_id != $this->auth->id) {
            $this->error(__('You have no permission'));
        }
        if ($this->request->isPost()) {
            $this->token();
            $params = $this->request->post("row/a");
            if ($params) {
                # 检查是否存在已经开启的活动
                if ($params['status']) {
                    if (!$row->is_set_blade || !$row->is_set_prize) {
                        $this->error(__('需要先配置模板和奖品才能开启活动'));
                    }
                    $activity = $this->model->where('admin_id', $this->auth->id)->where('status', 1)->whereNotIn('id', [$row->id])->find();
                    if ($activity) {
                        $this->error(__('已开启了一个活动, 请先关闭该活动再开启新的活动！'));
                    }
                }
                $result = $row->validate('Activity.edit')->save($params);
                if ($result === false) {
                    $this->error($row->getError());
                }
                $this->success('修改成功！');
            }
        }
        $this->view->assign("row", $row);
        return $this->view->fetch();
    }

}
