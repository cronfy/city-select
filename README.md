Нужно в composer.json прописать:

```
  "require": {
    ...
    "bower-asset/jquery-ui": "1.12.1 as 1.11.999",
  },

```

Иначе будет ошибка в console.log() появляться с jquery 3.
 
https://github.com/yiisoft/yii2-jui/issues/63#issuecomment-332614107