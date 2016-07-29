drop table if exists `product`;
drop table if exists `diner`;
drop table if exists `user`;
drop table if exists `file`;

create table `file`(
	no int not null auto_increment,
    filepath varchar(128) not null,
    status int default 1,
    primary key (no)
);

create table `user`(
	no int not null auto_increment,
    real_name varchar(45) not null,
    show_name varchar(45) not null,
    email varchar(255) not null,
    password varchar(100) not null,
    sex int not null,
    birth_date date not null,
    created_date datetime default now(),
    last_date datetime default now(),
    image int default -1,
    status int,
    primary key (no),
    foreign key (image) references file(no),
    unique index (email),
    unique index (show_name)
);

INSERT INTO `frog`.`user` (`no`, `real_name`, `show_name`, `email`, `password`, `sex`, `birth_date`, `created_date`, `last_date`, `image`, `status`) VALUES ('1', '테스터원', 'testdaisuki', 'tester1@gmail.com', '123456', '1', '1997-09-01', '2016-07-25', '2016-07-25', '1', '3');

create table `diner`(
	no int not null auto_increment comment '식당 번호',
	owner int not null,
	diner_name varchar(200) not null comment '식당 이름',
	diner_call varchar(200) not null comment '식당 전화번호',
	intro text not null comment'식당 소개',
	rest_day varchar(200) not null comment '휴무일',
	posting_date datetime not null comment '작성 날짜',
	road_address varchar(260) not null comment '실주소',
	post_address varchar(260) not null comment '우편번호',
	latitude float not null,
	longitude float not null,
	photos varchar(255) not null comment '사진들',
	foreign key (owner) references user(no),
	PRIMARY KEY(no)
);

create table `product`(
	no int not null auto_increment comment '메뉴 번호',
	diner_no int not null comment '식당 번호',
	menu_name varchar(200) not null comment '메뉴 이름',
	posting_date datetime not null comment '업로드 날짜',
	intro text not null comment '메뉴 소개',
	PRIMARY KEY (no),
	FOREIGN KEY (diner_no) REFERENCES diner(no) on delete cascade
);