#include "SeldonTelemetryService.h"
#include <android-base/logging.h>
#include <android/binder_manager.h>
#include <android/binder_process.h>

using aidl::com::seldon::os::telemetry::SeldonTelemetryService;

int main(int /* argc */, char** /* argv */) {
    android::base::InitLogging(nullptr, android::base::LogdLogger(android::base::SYSTEM));
    LOG(INFO) << "Starting seldond (Seldon Core Native Daemon) on Android 15...";

    // 1. Configurar threadpool do Binder
    ABinderProcess_setThreadPoolMaxThreadCount(4);
    ABinderProcess_startThreadPool();

    // 2. Instanciar a implementação do serviço AIDL
    std::shared_ptr<SeldonTelemetryService> service = ndk::SharedRefBase::make<SeldonTelemetryService>();

    // 3. Registrar o serviço no ServiceManager nativo do Android
    const std::string instance = std::string(SeldonTelemetryService::descriptor) + "/default";
    binder_status_t status = AServiceManager_addService(service->asBinder().get(), instance.c_str());

    if (status != STATUS_OK) {
        LOG(FATAL) << "Failed to register SeldonTelemetryService with ServiceManager: " << status;
        return 1;
    }

    LOG(INFO) << "SeldonTelemetryService successfully registered as: " << instance;

    // 4. Juntar-se ao threadpool para atender requisições IPC continuamente
    ABinderProcess_joinThreadPool();
    return 0;
}
