<?php
/**
 * Created by PhpStorm.
 * User: cronfy
 * Date: 27.10.17
 * Time: 14:28
 */

namespace cronfy\citySelect;

use yii\jui\JuiAsset;
use yii\web\AssetBundle;
use yii\web\YiiAsset;

class CitySelectAsset extends AssetBundle
{
    public $sourcePath = __DIR__;

    public $js = [
        'index.js'
    ];

    public $depends = [
        JuiAsset::class,
        YiiAsset::class, // для csrf
    ];
}