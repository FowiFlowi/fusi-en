app.controller('listController', ['$scope', '$http', 'words', function($scope, $http, words) {
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

    $scope.deleteWord = (index) => {
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
}])