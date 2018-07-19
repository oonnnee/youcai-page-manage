

GIT_HOME=/youcai/git-repository
DEST_PATH=/youcai/front

if [ ! -n "$1" ];
then
    echo -e "Please input a project name! You can input as follows:"
    echo -e "./deploy.sh youcai-page-manage"
    exit
fi

if [ $1 = "youcai-page-manage" ];
then
    echo -e "---------Enter Project--------"
    cd $GIT_HOME/$1
else
    echo -e "Invalid Project Name!"
    exit
fi

# clean dist
echo -e "---------Clean Dist--------"
rm -rf ./dist

echo -e "---------Git Pull--------"
git pull

echo -e "---------Yarn Install--------"
yarn

echo -e "---------Yarn Run Build--------"
yarn run build

if [ -d "./dist" ];
then
    echo -e "---------clean Dest--------"
    rm -rf $DEST_PATH/$1/dist

    echo -e "---------copy Dest--------"
    cp -R ./dist/* $DEST_PATH/$1/dist

    echo -e "---------Deploy Success--------"
else
    echo -e "---------Deploy Fail--------"
fi

