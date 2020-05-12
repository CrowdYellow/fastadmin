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
    }

    public function add()
    {
        if ($this->request->isPost()) {
            $this->token();
            $params = $this->request->post("row/a");
            $admin              = \think\Session::get('admin');
            $params['admin_id'] = $admin['id'];
            $result = $this->model->validate('Activity.add')->save($params);
            if ($result === false) {
                $this->error($this->model->getError());
            }
            $this->success();
        }
        return $this->view->fetch();
    }

}
