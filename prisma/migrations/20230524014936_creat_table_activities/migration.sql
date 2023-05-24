-- CreateTable
CREATE TABLE "Activities" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slot" INTEGER NOT NULL,
    "scheduleId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT '2023-05-23 22:15:35.995523'::timestamp without time zone,
    "updatedAt" TIMESTAMP(6) DEFAULT '2023-05-23 22:15:35.995523'::timestamp without time zone,

    CONSTRAINT "Activities_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivitiesLocal" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "ActivitiesLocal_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivitiesSchedule" (
    "id" SERIAL NOT NULL,
    "startsAt" DATE NOT NULL,
    "endsAt" DATE NOT NULL,
    "localId" INTEGER NOT NULL,

    CONSTRAINT "ActivitiesSchedule_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserActivities" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,

    CONSTRAINT "UserActivities_pk" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activities" ADD CONSTRAINT "Activities_fk0" FOREIGN KEY ("scheduleId") REFERENCES "ActivitiesSchedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ActivitiesSchedule" ADD CONSTRAINT "ActivitiesSchedule_fk0" FOREIGN KEY ("localId") REFERENCES "ActivitiesLocal"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserActivities" ADD CONSTRAINT "UserActivities_fk0" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserActivities" ADD CONSTRAINT "UserActivities_fk1" FOREIGN KEY ("activityId") REFERENCES "Activities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
