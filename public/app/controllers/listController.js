app.controller('listController', ['$scope', '$http', '$timeout', 'words', function($scope, $http, $timeout, words) {
    words.get().then(list => {
        $scope.wordList = list
        $scope.listLength = list.length

        $scope.loading.length--
        if (!$scope.loading.length) {
            $scope.loading.ready = true
            $scope.loading.displayStyle = 'inline'
        }
    })

    $scope.FABpressed = false
    $scope.buttonIcon = 'add'
    $scope.tabIndex = null

    $scope.addWord = () => {
        $scope.tabIndex = $scope.userList.reduce((res, item) => res.concat(item.username), []).indexOf($scope.user.username) + 1
        $scope.FABpressed = true
        $scope.buttonIcon = 'done'
        $scope.setHideFooter(true)

        if ($scope.word && $scope.translate) {
            $scope.FABpressed = false
            let wordData = {
                word: $scope.word,
                translate: $scope.translate,
                author: $scope.user.username,
                date: +new Date()
            }

            $http.post('/words', wordData).then(res => {
                wordData._id = res.data
                words.push(wordData)
            })

            $scope.word = ''
            $scope.translate = ''
            $scope.buttonIcon = 'add'

            $scope.user.wordsAmount++
            $scope.listLength++
            $scope.setHideFooter(false)
        }
    }

    $scope.deleteWord = index => {
        let userWords = []

        words.get().then(list => {
            list.forEach(word => word.author == $scope.user.username ? userWords.push(word) : '')

            let url = `/words/${userWords[index]._id}`
            $http.delete(url)
            words.remove(userWords[index])

            $scope.user.wordsAmount--
            $scope.listLength--
        })
    }


    let timer,
        changeWord = true,
        changeTranslate = true
    $scope.onInputWord = text => {
        $timeout.cancel(timer)
        changeWord = false

        if ($scope.word && changeTranslate) {

            timer = $timeout(() => {
                $http.post('/translate', { text, from: 'en', to: 'ru' })
                .then(res => $scope.translate = res.data.toLowerCase())
            }, 300)

        } else changeWord = true
    }
    $scope.onInputTranslate = text => {
        $timeout.cancel(timer)
        changeTranslate = false

        if ($scope.translate && changeWord) {

            timer = $timeout(() => {
                $http.post('/translate', { text, from: 'ru', to: 'en' })
                .then(res => $scope.word = res.data.toLowerCase())
            }, 300)

        } else changeTranslate = true
    }
}])